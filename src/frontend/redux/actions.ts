import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as calendarDuck from "tv/frontend/redux/ducks/calendar";
import { TheState } from "tv/frontend/redux/state";

export type T = redux.Action<String> &
  (
    | authDuck.ThisAction
    | metaDuck.ThisAction
    | searchDuck.ThisAction
    | calendarDuck.ThisAction);

// alias for our redux-thunk actions
export type TT<R> = reduxThunk.ThunkAction<Promise<R>, TheState, null, T>;

export type ThisDispatch = reduxThunk.ThunkDispatch<TheState, null, T>;
