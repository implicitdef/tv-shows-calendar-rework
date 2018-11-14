import * as redux from "redux";
import reduxThunk from "redux-thunk";
import * as google from "tv/frontend/services/google";
import * as authThunk from "tv/frontend/redux/thunks/auth";
import * as Reducer from "tv/frontend/redux/reducer";
import * as Actions from "tv/frontend/redux/actions";
import * as $ from "jquery";
const reduxCompose: any =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;

export const store = redux.createStore(
  Reducer.f,
  reduxCompose(redux.applyMiddleware(reduxThunk))
);

$(() => {
  google.setup();
  const dispatch = store.dispatch as Actions.ThisDispatch;
  dispatch(authThunk.checkStatusOnStartupAndFetch());
});
