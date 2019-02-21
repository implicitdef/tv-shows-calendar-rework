import * as authDuck from 'tv/frontend/redux/ducks/auth'
import * as metaDuck from 'tv/frontend/redux/ducks/meta'
import * as calendarDuck from 'tv/frontend/redux/ducks/calendar'
import * as calendarDataFetcher from 'tv/frontend/services/calendarDataFetcher'
import { SomeThunkAction } from 'tv/frontend/redux/actions'

export const fetchSeasons = (): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    try {
      const seasons = await calendarDataFetcher.getSeasonsWithShows(
        { dispatch, getState },
        authDuck.loggedInStatusSelector(getState()) === 'loggedIn',
      )
      dispatch(calendarDuck.actions.registerSeasons(seasons))
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError())
    }
  }
}
