import * as Actions from "tv/frontend/redux/actions";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as api from "tv/frontend/services/api";

export const searchShows = (input: string): Actions.TT<void> => {
  return async (dispatch, getState) => {
    try {
      if (input.trim().length === 0) {
        dispatch(searchDuck.actions.clear());
      } else {
        dispatch(searchDuck.actions.setInput(input));
        const shows = await api.searchShows({ dispatch, getState }, input);
        dispatch(searchDuck.actions.setResults(shows));
      }
      dispatch(searchDuck.actions.open());
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
    }
  };
};
