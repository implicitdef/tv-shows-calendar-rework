import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as calendarDuck from "tv/frontend/redux/ducks/calendar";
import { TheState } from "tv/frontend/redux/state";

export type PlainAction = redux.Action<String> &
  (
    | authDuck.AuthAction
    | metaDuck.ThisAction
    | searchDuck.ThisAction
    | calendarDuck.CalendarAction);

// alias for our redux-thunk actions
export type SomeThunkAction<R> = reduxThunk.ThunkAction<
  Promise<R>,
  TheState,
  null,
  PlainAction
>;

export type TheDispatch = reduxThunk.ThunkDispatch<
  TheState,
  null,
  PlainAction
>;
