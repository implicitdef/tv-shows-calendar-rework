import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import { SomeThunkAction } from 'tv/frontend/redux/actions'
import { authActions } from 'tv/frontend/redux/ducks/auth'
import { metaActions } from 'tv/frontend/redux/ducks/meta'
import * as calendarThunk from 'tv/frontend/redux/thunks/calendar'
import { createApolloClient } from 'tv/frontend/services/api'
import * as google from 'tv/frontend/services/google'

export const login = (): SomeThunkAction<void> => {
  return async dispatch => {
    try {
      await google.login()
      const token = await google.getToken()
      const user = await google.getUserInfo()
      dispatch(authActions.setLoggedIn({ token, user }))
      await dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      console.log(e)
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
      console.log(e)
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
      console.log(e)
      dispatch(authActions.setLoggedOut())
    }
  }
}

export const createApolloClientAndStoreIt = (): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    const apolloClient = createApolloClient({ dispatch, getState })
    await dispatch(metaActions.setApolloClient(apolloClient))
  }
}
