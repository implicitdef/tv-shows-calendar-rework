import * as metaDuck from 'tv/frontend/redux/ducks/meta'
import * as calendarDuck from 'tv/frontend/redux/ducks/calendar'
import * as calendarDataFetcher from 'tv/frontend/services/calendarDataFetcher'
import { SomeThunkAction } from 'tv/frontend/redux/actions'
import { loggedInStatusSelector } from 'tv/frontend/redux/ducks/auth'

export const fetchSeasons = (): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    try {
      const seasons = await calendarDataFetcher.getSeasonsWithShows(
        { dispatch, getState },
        loggedInStatusSelector(getState()) === 'loggedIn',
      )
      dispatch(calendarDuck.calendarActions.registerSeasons(seasons))
    } catch (e) {
      dispatch(metaDuck.metaActions.registerGlobalError())
    }
  }
}
