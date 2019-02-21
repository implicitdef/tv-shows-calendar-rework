import { SomeThunkAction } from 'tv/frontend/redux/actions'
import * as authDuck from 'tv/frontend/redux/ducks/auth'
import * as metaDuck from 'tv/frontend/redux/ducks/meta'
import * as calendarThunk from 'tv/frontend/redux/thunks/calendar'
import * as google from 'tv/frontend/services/google'

export const login = (): SomeThunkAction<void> => {
  return async dispatch => {
    try {
      await google.login()
      const token = await google.getToken()
      const user = await google.getUserInfo()
      dispatch(authDuck.authActions.setLoggedIn({ token, user }))
      await dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      dispatch(metaDuck.metaActions.registerGlobalError())
    }
  }
}

export const logout = (): SomeThunkAction<void> => {
  return async dispatch => {
    try {
      await google.logout()
      dispatch(authDuck.authActions.setLoggedOut())
      await dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      dispatch(metaDuck.metaActions.registerGlobalError())
    }
  }
}

export const checkStatusOnStartupAndFetch = (): SomeThunkAction<void> => {
  return async dispatch => {
    try {
      const isLoggedIn = await google.isLoggedIn()
      if (isLoggedIn) {
        const user = await google.getUserInfo()
        const token = await google.getToken()
        dispatch(authDuck.authActions.setLoggedIn({ token, user }))
      } else {
        dispatch(authDuck.authActions.setLoggedOut())
      }
      await dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      dispatch(authDuck.authActions.setLoggedOut())
    }
  }
}
