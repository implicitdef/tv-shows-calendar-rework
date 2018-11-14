import * as google from "tv/frontend/services/google";

import { ActionsUnion, createAction } from "@martin_hotell/rex-tils";

import { createSelector } from "reselect";
import * as State from "tv/frontend/redux/ducks/state";

export const LOGIN = "auth.LOGIN";
export const LOGOUT = "auth.LOGOUT";

export type ThisState = {
  token: string | null;
  user: google.User | null;
};

export const initial = {
  token: null,
  user: null
};

const authSelector = (state: State.T) => state.auth;
const userInfoSelector = createSelector(
  authSelector,
  auth => auth.user
);
export const tokenSelector: State.Selector<string | null> = createSelector(
  authSelector,
  auth => auth.token
);
export const isUserLoggedInSelector: State.Selector<boolean> = createSelector(
  tokenSelector,
  token => !!token
);
export const userEmailSelector: State.Selector<string | null> = createSelector(
  isUserLoggedInSelector,
  userInfoSelector,
  (isUserLoggedIn, userInfo) =>
    isUserLoggedIn && userInfo ? userInfo.email : null
);

export const actions = {
  login: (value: { token: string; user: google.User }) =>
    createAction(LOGIN, value),
  logout: () => createAction(LOGOUT)
};

export type ThisAction = ActionsUnion<typeof actions>;

export default (state: ThisState = initial, action: ThisAction): ThisState => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: null,
        token: null
      };
    }
    default:
      return state;
  }
};
