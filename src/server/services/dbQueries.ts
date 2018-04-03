import * as Knex from "knex";
import * as Domain from "tv/shared/domain";
import * as Utils from "tv/server/utils/utils";

interface RawJsonDataRow {
  id: number;
  content: string;
}

interface User {
  id: number;
  google_user_id: string;
}
interface UserSerieRow {
  user_id: number;
  serie_id: number;
}

export async function loadData(
  knex: Knex.QueryInterface
): Promise<Domain.ShowAndSeasons[]> {
  const rows = await Utils.bluebirdToNative(
    knex
      .select()
      .from("raw_json_data")
      .orderBy("creation_time", "desc")
      .limit(1)
  );
  const rowsCasted = rows as RawJsonDataRow[];
  const json = JSON.parse(rowsCasted[0].content);
  return json as Domain.ShowAndSeasons[];
}

export async function getUserByGoogleUserId(
  knex: Knex.QueryInterface,
  googleUserId: string
): Promise<User | null> {
  const rows = await Utils.bluebirdToNative(
    knex
      .select()
      .where({
        google_user_id: googleUserId
      })
      .from("users")
  );
  const rowsCasted = rows as User[];
  if (rowsCasted.length > 0) {
    return rowsCasted[0];
  } else {
    return null;
  }
}

export async function saveUser(
  knex: Knex.QueryInterface,
  googleUserId: string
): Promise<number> {
  const rows = await Utils.bluebirdToNative(
    knex
      .insert({
        google_user_id: googleUserId
      })
      .into("users")
      .returning("id")
  );
  const rowsCasted = rows as number[];
  if (rowsCasted.length === 1) {
    return rowsCasted[0];
  } else {
    throw new Error(
      `${rowsCasted.length} rows were created by the saveUser query`
    );
  }
}

export async function addSerieToUser(
  knex: Knex.QueryInterface,
  userId: number,
  serieId: number
): Promise<void> {
  try {
    await Utils.bluebirdToNative(
      knex
        .insert({
          user_id: userId,
          serie_id: serieId
        })
        .into("users_series")
    );
  } catch (err) {
    // swallow duplicate key constraint
    if (err.code !== "23505") {
      throw err;
    }
  }
}

export async function removeSerieFromUser(
  knex: Knex.QueryInterface,
  userId: number,
  serieId: number
): Promise<void> {
  return Utils.bluebirdToNative(
    knex
      .del()
      .where({
        user_id: userId,
        serie_id: serieId
      })
      .from("users_series")
  );
}

export async function getSeriesOfUser(
  knex: Knex.QueryInterface,
  userId: number
): Promise<number[]> {
  const rows = await Utils.bluebirdToNative(
    knex
      .select()
      .from("users_series")
      .where({
        user_id: userId
      })
      .orderBy("serie_id", "asc")
  );
  const rowsCasted = rows as UserSerieRow[];
  return rowsCasted.map(row => row.serie_id);
}

export async function pushData(
  knex: Knex.QueryInterface,
  data: string
): Promise<void> {
  return await Utils.bluebirdToNative(
    knex.insert({ content: data }).into("raw_json_data")
  );
}
