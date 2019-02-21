import * as Knex from 'knex'
import * as DbQueries from 'tv/server/services/dbQueries'
import * as Conf from 'tv/server/utils/conf'
import * as Domain from 'tv/shared/domain'

const knexClient = Knex({
  client: 'postgres',
  connection: Conf.db,
})

export async function loadData(): Promise<Domain.ShowAndSeasons[]> {
  return DbQueries.loadData(knexClient)
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
      return DbQueries.addSerieToUser(trx, newUserId, serieId)
    }, Promise.resolve())
    return newUserId
  })
}
export async function addSerieToUser(
  userId: number,
  serieId: number,
): Promise<void> {
  await DbQueries.addSerieToUser(knexClient, userId, serieId)
}
export async function removeSerieFromUser(
  userId: number,
  serieId: number,
): Promise<void> {
  return DbQueries.removeSerieFromUser(knexClient, userId, serieId)
}
export async function getSeriesOfUser(userId: number): Promise<number[]> {
  return DbQueries.getSeriesOfUser(knexClient, userId)
}

export async function pushData(data: string): Promise<void> {
  return DbQueries.pushData(knexClient, data)
}
