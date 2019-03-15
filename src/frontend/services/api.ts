import * as axios from 'axios'
import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import gql from 'graphql-tag'
import moment, { Moment } from 'moment'
import { getAxios, Wirings } from 'tv/frontend/services/axiosAndApolloConfig'
import * as cache from 'tv/frontend/services/cache'
import * as conf from 'tv/frontend/services/conf'
import { Season, Show } from 'tv/shared/domain'
import { apolloClientSelector } from 'tv/frontend/redux/ducks/meta'

const base = conf.serverUrl

function extractData(response: axios.AxiosResponse): any {
  return response.data
}

function getApolloClient({ getState }: Wirings) {
  const client = apolloClientSelector(getState())
  if (client === undefined) throw new Error('Apollo client missing from store')
  return client
}

export function searchShows(wirings: Wirings, q: string): Promise<Show[]> {
  // TODO see if apollo cache doesn't handle that already somehow
  // TODO if not, recode cache with memoisation from lodash or something like that
  return cache.cached('all-shows-' + q, () => {
    return getApolloClient(wirings)
      .query({
        query: gql`
          query SEARCH_SHOWS($q: String!) {
            search(input: $q) {
              id
              name
            }
          }
        `,
        variables: { q },
      })
      .then(_ => _.data.search)
  })
}

export function seasonsOfShow(
  wirings: Wirings,
  showId: string,
): Promise<Season<Moment>[]> {
  return cache.cached(`seasons-of-${showId}`, () => {
    return getApolloClient(wirings)
      .query({
        query: gql`
          query GET_SEASONS_OF_SHOW($showId: ID!) {
            show(id: $showId) {
              seasons {
                number
                time {
                  start
                  end
                }
              }
            }
          }
        `,
        variables: { showId },
      })
      .then(_ => _.data.show.seasons)
      .then((seasons: Season<string>[]) =>
        seasons.map(season => ({
          ...season,
          time: {
            start: moment(season.time.start),
            end: moment(season.time.end),
          },
        })),
      )
  })
}

export function userShows(wirings: Wirings): Promise<Show[]> {
  return getAxios(wirings)
    .get(`${base}/me/shows`)
    .then()
    .then(extractData)
}

export function defaultShows(wirings: Wirings): Promise<Show[]> {
  return cache.cached('default-shows', () => {
    return getAxios(wirings)
      .get(`${base}/shows/default`)
      .then()
      .then(extractData)
  })
}

export async function followShow(wirings: Wirings, id: string): Promise<void> {
  try {
    await getAxios(wirings).post(`${base}/me/shows/${id}`)
  } catch (err) {
    const e: axios.AxiosError = err
    // we tolerate the conflict
    // so we can follow something we followed already
    if (!e.response || e.response.status !== 409) {
      throw e
    }
  }
}

export async function unfollowShow(
  wirings: Wirings,
  id: string,
): Promise<void> {
  await getAxios(wirings).delete(`${base}/me/shows/${id}`)
}
