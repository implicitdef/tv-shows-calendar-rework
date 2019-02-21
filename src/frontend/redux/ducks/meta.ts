import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'
import { createSelector } from 'reselect'
import { TheState } from 'tv/frontend/redux/state'

export type MetaState = {
  isAboutDisplayed: boolean
  hasGlobalError: boolean
}

export const initial = {
  isAboutDisplayed: false,
  hasGlobalError: false,
}

const rootSelector = (state: TheState) => state.meta
export const isAboutDisplayedSelector = createSelector(
  rootSelector,
  _ => _.isAboutDisplayed,
)
export const hasGlobalErrorSelector = createSelector(
  rootSelector,
  _ => _.hasGlobalError,
)

export const SET_IS_ABOUT_DISPLAYED = 'meta.SET_IS_ABOUT_DISPLAYED'
export const SET_HAS_GLOBAL_ERROR = 'meta.SET_GLOBAL_ERROR'

export const metaActions = {
  displayAbout: () => createAction(SET_IS_ABOUT_DISPLAYED, true),
  hideAbout: () => createAction(SET_IS_ABOUT_DISPLAYED, false),
  registerGlobalError: () => createAction(SET_HAS_GLOBAL_ERROR, true),
  clearGlobalError: () => createAction(SET_HAS_GLOBAL_ERROR, false),
}

export type MetaAction = ActionsUnion<typeof metaActions>

export default (state: MetaState = initial, action: MetaAction): MetaState => {
  switch (action.type) {
    case SET_IS_ABOUT_DISPLAYED: {
      return {
        ...state,
        isAboutDisplayed: action.payload,
      }
    }
    case SET_HAS_GLOBAL_ERROR: {
      return {
        ...state,
        hasGlobalError: action.payload,
      }
    }
    default:
      return state
  }
}
