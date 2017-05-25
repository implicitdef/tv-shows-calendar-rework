import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as api from "tv/frontend/services/api";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as metaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as metaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";

export type ThisAction  = {
  type: "calendar/search/RESULTS_LOADED";
  payload: Domain.Show[];
} | {
  type: "calendar/search/SET_INPUT";
  payload: string;
} | {
  type: "calendar/search/OPEN";
} | {
  type: "calendar/search/CLOSE";
};

interface ThisState {
  results: Domain.Show[];
  input: string;
  open: boolean;
}

const initialState = {results: [], input: "", open: false};

export default function reducer(state: ThisState = initialState, action: ThisAction): ThisState {
  switch (action.type) {
    case "calendar/search/RESULTS_LOADED":
      return {
        ...state,
        results: action.payload,
      };
    case "calendar/search/SET_INPUT":
      return {
        ...state,
        input: action.payload,
      };
    case "calendar/search/OPEN":
      return {
        ...state,
        open: true,
      };
    case "calendar/search/CLOSE":
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
}

const loaded = (results: Domain.Show[]): ThisAction => ({
  type: "calendar/search/RESULTS_LOADED",
  payload: results,
});

const setInput = (input: string): ThisAction => ({
  type: "calendar/search/SET_INPUT",
  payload: input,
});

export const open = (): ThisAction => ({
  type: "calendar/search/OPEN",
});

export const close = (): ThisAction => ({
  type: "calendar/search/CLOSE",
});

export const clear = (): Actions.TT<void> => {
  return async (dispatch) => {
    dispatch(loaded([]));
    dispatch(setInput(""));
  };
};

export const searchShows = (input: string): Actions.TT<void> => {
  return async (dispatch) => {
    try {
      dispatch(setInput(input));
      if (input.trim().length === 0) {
        dispatch(loaded([]));
      } else {
        const shows = await api.searchShows(dispatch, input);
        dispatch(loaded(shows));
      }
      dispatch(open());
    } catch (e) {
      dispatch(metaHasGlobalError.set());
    }
  };
};
