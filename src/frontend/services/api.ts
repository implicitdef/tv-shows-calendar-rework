import ApolloClient from 'apollo-boost'
import * as axios from 'axios'
import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import gql from 'graphql-tag'
import moment, { Moment } from 'moment'
import { tokenSelector } from 'tv/frontend/redux/ducks/auth'
import { apolloClientSelector } from 'tv/frontend/redux/ducks/meta'
import * as authThunk from 'tv/frontend/redux/thunks/auth'
import { getAxios, Wirings } from 'tv/frontend/services/axiosAndApolloConfig'
import * as cache from 'tv/frontend/services/cache'
import * as conf from 'tv/frontend/services/conf'
import { serverUrl } from 'tv/frontend/services/conf'
import { AUTH_TOKEN_HEADER } from 'tv/shared/constants'
import { Season, Show } from 'tv/shared/domain'

const base = conf.serverUrl

function getApolloClient({ getState }: Wirings) {
  const client = apolloClientSelector(getState())
  if (client === undefined) throw new Error('Apollo client missing from store')
  return client
}

export function createApolloClient({
  dispatch,
  getState,
}: Wirings): ApolloClient<{}> {
  return new ApolloClient({
    uri: `${serverUrl}/graphql`,
    request: operation => {
      // Add auth header if connected
      const token = tokenSelector(getState())
      if (token != null) {
        operation.setContext({
          headers: {
            [AUTH_TOKEN_HEADER]: token,
          },
        })
      }
      return Promise.resolve()
    },
    onError: ({ graphQLErrors }) => {
      // Disconnect if auth troubles
      const isBadTokenError =
        graphQLErrors &&
        graphQLErrors.find(
          e => !!e.extensions && e.extensions.code === 'UNAUTHENTICATED',
        ) !== undefined
      if (isBadTokenError) dispatch(authThunk.logout())
    },
  })
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

export function meShows(wirings: Wirings): Promise<Show[]> {
  return getApolloClient(wirings)
    .query({
      query: gql`
        query ME_SHOWS {
          me {
            shows {
              id
              name
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
    })
    .then(_ => _.data.me.shows)
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
