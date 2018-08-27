import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as metaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as metaAbout from "tv/frontend/redux/ducks/meta/about";
import * as metaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";

export type T = redux.Action &
  (
    | metaHasGlobalError.ThisAction
    | metaRunningCalls.ThisAction
    | metaAbout.ThisAction);

// alias for our redux-thunk actions
export type TT<R> = reduxThunk.ThunkAction<Promise<R>, State.T, null, T>;

export type ThisDispatch = redux.Dispatch<T>;
