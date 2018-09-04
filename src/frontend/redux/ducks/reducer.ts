import * as redux from "redux";
import duckAuthLoggedIn from "tv/frontend/redux/ducks/auth/loggedIn";
import duckAuthUserInfo from "tv/frontend/redux/ducks/auth/userInfo";
import duckCalendarSearch from "tv/frontend/redux/ducks/calendar/search";
import duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import duckCalendarYear from "tv/frontend/redux/ducks/calendar/year";
import duckMetaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import duckMetaAbout from "tv/frontend/redux/ducks/meta/about";
import duckMetaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";

export const f: redux.Reducer<State.T> = redux.combineReducers({
  auth: redux.combineReducers({
    loggedIn: duckAuthLoggedIn,
    userInfo: duckAuthUserInfo
  }),
  calendar: redux.combineReducers({
    search: duckCalendarSearch,
    seasons: duckCalendarSeasons,
    year: duckCalendarYear
  }),
  meta: redux.combineReducers({
    about: duckMetaAbout,
    hasGlobalError: duckMetaHasGlobalError,
    runningCalls: duckMetaRunningCalls
  })
});
