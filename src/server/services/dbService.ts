import knex from 'knex'
import * as DbQueries from 'tv/server/services/dbQueries'
import * as Conf from 'tv/server/utils/conf'
import { ShowAndSeasons } from 'tv/shared/domain'

const knexClient = knex({
  client: 'postgres',
  connection: Conf.db,
})

export async function loadData(): Promise<ShowAndSeasons[]> {
  const data = await DbQueries.loadData(knexClient)
  return data.map(showAndSeason => ({
    ...showAndSeason,
    serie: {
      ...showAndSeason.serie,
      // turns the id into strings
      id: String(showAndSeason.serie.id),
    },
  }))
}
export async function saveOrGetUser(googleUserId: string): Promise<number> {
  return knexClient.transaction(async trx => {
    const maybeUser = await DbQueries.getUserByGoogleUserId(trx, googleUserId)
    if (maybeUser) {
      return maybeUser.id
    }
    const newUserId = await DbQueries.saveUser(trx, googleUserId)
    await Conf.defaultShowsIds.reduce(async (previousPromise, serieId) => {
      await previousPromise
      return DbQueries.addSerieToUser(trx, newUserId, parseInt(serieId, 10))
    }, Promise.resolve())
    return newUserId
  })
}
export async function addSerieToUser(
  userId: number,
  serieId: string,
): Promise<void> {
  await DbQueries.addSerieToUser(knexClient, userId, parseInt(serieId, 10))
}
export async function removeSerieFromUser(
  userId: number,
  serieId: string,
): Promise<void> {
  return DbQueries.removeSerieFromUser(
    knexClient,
    userId,
    parseInt(serieId, 10),
  )
}
export async function getSeriesOfUser(userId: number): Promise<string[]> {
  const ids = await DbQueries.getSeriesOfUser(knexClient, userId)
  return ids.map(_ => String(_))
}

export async function pushData(data: string): Promise<void> {
  return DbQueries.pushData(knexClient, data)
}
