import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as duckAuthLoggedIn from "tv/frontend/redux/ducks/auth/loggedIn";
import * as duckAuthUserInfo from "tv/frontend/redux/ducks/auth/userInfo";
import * as duckCalendarSearch from "tv/frontend/redux/ducks/calendar/search";
import * as duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as duckCalendarYear from "tv/frontend/redux/ducks/calendar/year";
import * as duckMetaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as duckMetaAbout from "tv/frontend/redux/ducks/meta/about";
import * as duckMetaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";

export type T = redux.Action<String> &
  (
    | duckAuthLoggedIn.ThisAction
    | duckAuthUserInfo.ThisAction
    | duckCalendarSeasons.ThisAction
    | duckCalendarSearch.ThisAction
    | duckCalendarYear.ThisAction
    | duckMetaAbout.ThisAction
    | duckMetaHasGlobalError.ThisAction
    | duckMetaRunningCalls.ThisAction);

// alias for our redux-thunk actions
export type TT<R> = reduxThunk.ThunkAction<Promise<R>, State.T, null, T>;

export type ThisDispatch = reduxThunk.ThunkDispatch<State.T, null, T>;
