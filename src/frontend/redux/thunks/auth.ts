import ApolloClient from 'apollo-boost'
import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import { SomeThunkAction } from 'tv/frontend/redux/actions'
import { authActions, tokenSelector } from 'tv/frontend/redux/ducks/auth'
import { metaActions } from 'tv/frontend/redux/ducks/meta'
import * as authThunk from 'tv/frontend/redux/thunks/auth'
import * as calendarThunk from 'tv/frontend/redux/thunks/calendar'
import { serverUrl } from 'tv/frontend/services/conf'
import * as google from 'tv/frontend/services/google'
import { AUTH_TOKEN_HEADER } from 'tv/shared/constants'

export const login = (): SomeThunkAction<void> => {
  return async dispatch => {
    try {
      await google.login()
      const token = await google.getToken()
      const user = await google.getUserInfo()
      dispatch(authActions.setLoggedIn({ token, user }))
      await dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      dispatch(metaActions.registerGlobalError())
    }
  }
}

export const logout = (): SomeThunkAction<void> => {
  return async dispatch => {
    try {
      await google.logout()
      dispatch(authActions.setLoggedOut())
      await dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      dispatch(metaActions.registerGlobalError())
    }
  }
}

export const checkStatusOnStartupAndFetch = (): SomeThunkAction<void> => {
  return async dispatch => {
    try {
      dispatch(calendarThunk.fetchSeasons())
      const isLoggedIn = await google.isLoggedIn()
      if (isLoggedIn) {
        const user = await google.getUserInfo()
        const token = await google.getToken()
        dispatch(authActions.setLoggedIn({ token, user }))
      } else {
        dispatch(authActions.setLoggedOut())
      }
      await dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      dispatch(authActions.setLoggedOut())
    }
  }
}

export const createApolloClientAndStoreIt = (): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    const apolloClient = new ApolloClient({
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
    await dispatch(metaActions.setApolloClient(apolloClient))
  }
}
