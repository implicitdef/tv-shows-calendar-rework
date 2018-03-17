import * as redux from "redux";
import authLoggedIn from "tv/frontend/redux/ducks/auth/loggedIn";
import authUserInfo from "tv/frontend/redux/ducks/auth/userInfo";
import calendarSearch from "tv/frontend/redux/ducks/calendar/search";
import calendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import calendarYear from "tv/frontend/redux/ducks/calendar/year";
import metaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import metaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";

export const f: redux.Reducer<State.T> = redux.combineReducers({
  auth: redux.combineReducers({
    loggedIn: authLoggedIn,
    userInfo: authUserInfo
  }),
  calendar: redux.combineReducers({
    search: calendarSearch,
    seasons: calendarSeasons,
    year: calendarYear
  }),
  meta: redux.combineReducers({
    hasGlobalError: metaHasGlobalError,
    runningCalls: metaRunningCalls
  })
});
