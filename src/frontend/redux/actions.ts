import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as duckCalendarYear from "tv/frontend/redux/ducks/calendar/year";
import * as State from "tv/frontend/redux/state";

export type T = redux.Action<String> &
  (
    | authDuck.ThisAction
    | metaDuck.ThisAction
    | searchDuck.ThisAction
    | duckCalendarSeasons.ThisAction
    | duckCalendarYear.ThisAction);

// alias for our redux-thunk actions
export type TT<R> = reduxThunk.ThunkAction<Promise<R>, State.T, null, T>;

export type ThisDispatch = reduxThunk.ThunkDispatch<State.T, null, T>;
