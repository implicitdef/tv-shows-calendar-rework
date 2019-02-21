import * as api from 'tv/frontend/services/api'
import { SomeThunkAction } from 'tv/frontend/redux/actions'
import { searchActions } from 'tv/frontend/redux/ducks/search'
import { metaActions } from 'tv/frontend/redux/ducks/meta'

export const searchShows = (input: string): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    try {
      if (input.trim().length === 0) {
        dispatch(searchActions.clear())
      } else {
        dispatch(searchActions.setInput(input))
        const shows = await api.searchShows({ dispatch, getState }, input)
        dispatch(searchActions.setResults(shows))
      }
      dispatch(searchActions.open())
    } catch (e) {
      dispatch(metaActions.registerGlobalError())
    }
  }
}
