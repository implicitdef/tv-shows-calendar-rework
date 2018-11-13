import * as google from "tv/frontend/services/google";
import {
  createAction,
  createActions,
  handleActions,
  combineActions
} from "redux-actions";
import { createSelector } from "reselect";
import * as State from "tv/frontend/redux/ducks/state";

const prefix = "newAuth";

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
export const isUserLoggedInSelector: State.Selector<boolean> = createSelector(
  newAuthSelector,
  newAuth => !!newAuth.token
);
export const userEmailSelector: State.Selector<string | null> = createSelector(
  isUserLoggedInSelector,
  userInfoSelector,
  (isUserLoggedIn, userInfo) =>
    isUserLoggedIn && userInfo ? userInfo.email : null
);

const setToken = createAction<string>(`${prefix}.SET_TOKEN`);
const removeToken = createAction<{}>(`${prefix}.REMOVE_TOKEN`);

type ThisActionsPayload = string | {};

const reducer: Reducer<State> = handleActions<ThisState, ThisActionsPayload>(
  {
    [setToken.toString()]: (state, foo) => {
      return { ...state, counter: state.counter + amount };
    }
  },
  initial
);

removeToken({});
