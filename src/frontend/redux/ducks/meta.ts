import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'
import { createSelector } from 'reselect'
import { TheState } from 'tv/frontend/redux/state'
import { ApolloClient } from 'apollo-boost'

export type MetaState = {
  isAboutDisplayed: boolean
  hasGlobalError: boolean
  apolloClient?: ApolloClient<{}>
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
export const apolloClientSelector = createSelector(
  rootSelector,
  _ => _.apolloClient,
)

export const SET_IS_ABOUT_DISPLAYED = 'meta.SET_IS_ABOUT_DISPLAYED'
export const SET_HAS_GLOBAL_ERROR = 'meta.SET_GLOBAL_ERROR'
export const SET_APOLLO_CLIENT = 'meta.SET_APOLLO_CLIENT'

export const metaActions = {
  displayAbout: () => createAction(SET_IS_ABOUT_DISPLAYED, true),
  hideAbout: () => createAction(SET_IS_ABOUT_DISPLAYED, false),
  registerGlobalError: () => createAction(SET_HAS_GLOBAL_ERROR, true),
  clearGlobalError: () => createAction(SET_HAS_GLOBAL_ERROR, false),
  setApolloClient: (a: ApolloClient<{}>) => createAction(SET_APOLLO_CLIENT, a),
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
    case SET_APOLLO_CLIENT: {
      return {
        ...state,
        apolloClient: action.payload,
      }
    }
    default:
      return state
  }
}
