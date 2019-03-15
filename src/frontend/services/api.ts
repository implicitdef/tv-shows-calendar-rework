import * as axios from 'axios'
import moment, { Moment } from 'moment'
import { getAxios, Wirings } from 'tv/frontend/services/axiosConfig'
import * as cache from 'tv/frontend/services/cache'
import * as conf from 'tv/frontend/services/conf'
import { Show, Season } from 'tv/shared/domain'
import { ApolloQueryResult } from 'apollo-client'
import ApolloClient from 'apollo-boost'
import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import gql from 'graphql-tag'
import { serverUrl } from 'tv/frontend/services/conf'

export const apolloClient = new ApolloClient({
  uri: `${serverUrl}/graphql`,
})

const base = conf.serverUrl

function extractData(
  response: axios.AxiosResponse | ApolloQueryResult<any>,
): any {
  return response.data
}
export function allShows(wirings: Wirings): Promise<Show[]> {
  return cache.cached('all-shows', () => {
    return getAxios(wirings)
      .get(`${base}/shows`)
      .then(extractData)
  })
}

export function searchShows(_wirings: Wirings, q: string): Promise<Show[]> {
  // TODO see if apollo cache doesn't handle that already somehow
  // TODO if not, recode cache with memoisation from lodash or something like that
  return cache.cached('all-shows-' + q, () => {
    return apolloClient
      .query({
        query: gql`
          query searchShows($q: String) {
            shows(input: $q) {
              id
              name
            }
          }
        `,
        variables: { q },
      })
      .then(extractData)
      .then(_ => _.shows)
  })
}

export function seasonsOfShow(
  wirings: Wirings,
  showId: string,
): Promise<Season<Moment>[]> {
  return cache.cached(`seasons-of-${showId}`, () => {
    return getAxios(wirings)
      .get(`${base}/shows/${showId}/seasons`)
      .then(extractData)
      .then((data: Season<string>[]) => {
        return data.map(season => {
          return {
            ...season,
            time: {
              start: moment(season.time.start),
              end: moment(season.time.end),
            },
          }
        })
      })
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
