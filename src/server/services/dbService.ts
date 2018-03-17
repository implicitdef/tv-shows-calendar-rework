import * as Knex from "knex";
import * as Domain from "tv/shared/domain";
import * as Conf from "tv/server/utils/conf";
import * as Utils from "tv/server/utils/utils";
import * as DbQueries from "tv/server/services/dbQueries";

const knexClient = Knex({
  client: "postgres",
  connection: Conf.db
});

export async function loadData(): Promise<Domain.ShowAndSeasons[]> {
  return DbQueries.loadData(knexClient);
}
export async function saveOrGetUser(googleUserId: string): Promise<number> {
  return knexClient.transaction(async trx => {
    const maybeUser = await DbQueries.getUserByGoogleUserId(trx, googleUserId);
    if (maybeUser) {
      return maybeUser.id;
    }
    return DbQueries.saveUser(trx, googleUserId);
  });
}
export async function addSerieToUser(
  userId: number,
  serieId: number
): Promise<void> {
  return DbQueries.addSerieToUser(knexClient, userId, serieId);
}
export async function removeSerieFromUser(
  userId: number,
  serieId: number
): Promise<void> {
  return DbQueries.removeSerieFromUser(knexClient, userId, serieId);
}
export async function getSeriesOfUser(userId: number): Promise<number[]> {
  return DbQueries.getSeriesOfUser(knexClient, userId);
}
