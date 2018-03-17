import * as redux from "redux";
import reduxThunk from "redux-thunk";
import * as google from "tv/frontend/services/google";
import * as authLoggedIn from "tv/frontend/redux/ducks/auth/loggedIn";
import * as Reducer from "tv/frontend/redux/ducks/reducer";
import * as State from "tv/frontend/redux/ducks/state";
import * as $ from "jquery";
const reduxCompose: any =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;

export const store = redux.createStore(
  Reducer.f,
  State.initial(),
  reduxCompose(redux.applyMiddleware(reduxThunk))
);

$(() => {
  google.setup();
  store.dispatch(authLoggedIn.checkStatusOnStartupAndFetch());
});
