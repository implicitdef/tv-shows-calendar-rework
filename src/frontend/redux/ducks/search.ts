import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'
import { createSelector } from 'reselect'
import { TheState } from 'tv/frontend/redux/state'
import { Show } from 'tv/shared/domain'

export type SearchState = {
  results: Show[]
  input: string | null
  isOpen: boolean
}

export const initial = {
  results: [],
  input: null,
  isOpen: false,
}

const rootSelector = (state: TheState) => state.search
export const resultsSelector = createSelector(
  rootSelector,
  _ => _.results,
)
export const inputSelector = createSelector(
  rootSelector,
  _ => _.input || '',
)
export const isOpenSelector = createSelector(
  rootSelector,
  _ => _.isOpen,
)

export const SET_RESULTS = 'search.SET_RESULTS'
export const SET_INPUT = 'search.SET_INPUT'
export const SET_IS_OPEN = 'search.SET_IS_OPEN'
export const CLEAR = 'search.CLEAR'

export const searchActions = {
  setResults: (value: Show[]) => createAction(SET_RESULTS, value),
  setInput: (value: string) => createAction(SET_INPUT, value),
  clear: () => createAction(CLEAR),
  open: () => createAction(SET_IS_OPEN, true),
  close: () => createAction(SET_IS_OPEN, false),
}

export type SearchAction = ActionsUnion<typeof searchActions>

export default (
  state: SearchState = initial,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case SET_RESULTS: {
      return {
        ...state,
        results: action.payload,
      }
    }
    case SET_INPUT: {
      return {
        ...state,
        input: action.payload,
      }
    }
    case CLEAR: {
      return {
        ...state,
        results: [],
        input: null,
      }
    }
    case SET_IS_OPEN: {
      return {
        ...state,
        isOpen: action.payload,
      }
    }
    default:
      return state
  }
}
