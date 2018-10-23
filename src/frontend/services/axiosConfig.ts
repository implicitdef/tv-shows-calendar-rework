import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as Constants from "tv/shared/constants";
import * as loggedInDuck from "tv/frontend/redux/ducks/auth/loggedIn";
import * as runningCallsDuck from "tv/frontend/redux/ducks/meta/runningCalls";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as State from "tv/frontend/redux/ducks/state";

export type Wirings = {
  dispatch: Actions.ThisDispatch;
  getState: () => State.T;
};

export function getAxios({ dispatch, getState }: Wirings): AxiosInstance {
  const instance = axios.create();
  instance.interceptors.request.use(config => {
    dispatch(runningCallsDuck.start());
    const token = getState().auth.loggedIn.token;
    if (token == null) {
      return config;
    } else {
      config.headers[Constants.AUTH_TOKEN_HEADER] = token;
      return config;
    }
  });
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        const r = error.response as AxiosResponse;
        if (r.status === 401) {
          dispatch(loggedInDuck.logout());
        }
      }
      return error;
    }
  );
  return instance;
}
