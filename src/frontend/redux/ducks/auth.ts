import * as google from 'tv/frontend/services/google'

import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'

import { createSelector } from 'reselect'
import { TheState } from 'tv/frontend/redux/state'

export type AuthState =
  | {
      status: 'unknown'
    }
  | {
      status: 'loggedOut'
    }
  | {
      status: 'loggedIn'
      token: string
      user: google.User
    }

export const initial: AuthState = {
  status: 'unknown',
}

const rootSelector = (state: TheState) => state.auth
const userInfoSelector = createSelector(
  rootSelector,
  _ => (_.status === 'loggedIn' ? _.user : null),
)
export const tokenSelector = createSelector(
  rootSelector,
  _ => (_.status === 'loggedIn' ? _.token : null),
)
export const loggedInStatusSelector = createSelector(
  rootSelector,
  _ => _.status,
)
export const userEmailSelector = createSelector(
  userInfoSelector,
  userInfo => userInfo && userInfo.email,
)

export const actions = {
  setLoggedIn: (value: { token: string; user: google.User }) =>
    createAction('AUTH_SET_LOGGED_IN', value),
  setLoggedOut: () => createAction('AUTH_SET_LOGGED_OUT'),
}

export type AuthAction = ActionsUnion<typeof actions>

export default (state: AuthState = initial, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_SET_LOGGED_IN': {
      return {
        ...state,
        status: 'loggedIn',
        ...action.payload,
      }
    }
    case 'AUTH_SET_LOGGED_OUT': {
      return {
        status: 'loggedOut',
      }
    }
    default:
      return state
  }
}
