import { SomeThunkAction } from 'tv/frontend/redux/actions'
import { calendarActions } from 'tv/frontend/redux/ducks/calendar'
import { metaActions } from 'tv/frontend/redux/ducks/meta'
import * as calendarDataFetcher from 'tv/frontend/services/calendarDataFetcher'

export const fetchSeasons = (): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    try {
      const seasons = await calendarDataFetcher.getSeasonsWithShows({
        dispatch,
        getState,
      })
      dispatch(calendarActions.registerSeasons(seasons))
    } catch (e) {
      console.log(e)
      dispatch(metaActions.registerGlobalError())
    }
  }
}
