import * as google from "tv/frontend/services/google";

import { ActionsUnion, createAction } from "@martin_hotell/rex-tils";

import { createSelector } from "reselect";
import * as State from "tv/frontend/redux/ducks/state";

export const SET_TOKEN = "newAuth.SET_TOKEN";
export const SET_USER_INFO = "newAuth.SET_USER_INFO";

export type ThisState = {
  token: string | null;
  userInfo: google.User | null;
};

export const initial = {
  token: null,
  userInfo: null
};

const newAuthSelector = (state: State.T) => state.newAuth;
const userInfoSelector = createSelector(
  newAuthSelector,
  newAuth => newAuth.userInfo
);
export const tokenSelector: State.Selector<string | null> = createSelector(
  newAuthSelector,
  newAuth => newAuth.token
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
  setToken: (value: string | null) => createAction(SET_TOKEN, value),
  setUserInfo: (value: google.User | null) => createAction(SET_USER_INFO, value)
};

export type ThisAction = ActionsUnion<typeof actions>;

export default (state: ThisState = initial, action: ThisAction): ThisState => {
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload
      };
    }
    case SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.payload
      };
    }
    default:
      return state;
  }
};
