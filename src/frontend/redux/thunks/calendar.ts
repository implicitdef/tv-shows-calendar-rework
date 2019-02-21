import * as calendarDataFetcher from 'tv/frontend/services/calendarDataFetcher'
import { SomeThunkAction } from 'tv/frontend/redux/actions'
import { loggedInStatusSelector } from 'tv/frontend/redux/ducks/auth'
import { calendarActions } from 'tv/frontend/redux/ducks/calendar';
import { metaActions } from 'tv/frontend/redux/ducks/meta';

export const fetchSeasons = (): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    try {
      const seasons = await calendarDataFetcher.getSeasonsWithShows(
        { dispatch, getState },
        loggedInStatusSelector(getState()) === 'loggedIn',
      )
      dispatch(calendarActions.registerSeasons(seasons))
    } catch (e) {
      dispatch(metaActions.registerGlobalError())
    }
  }
}
