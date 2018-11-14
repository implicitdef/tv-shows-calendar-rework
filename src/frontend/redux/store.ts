import * as redux from "redux";
import reduxThunk from "redux-thunk";
import * as Reducer from "tv/frontend/redux/reducer";

const reduxCompose: any =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;

const store = redux.createStore(
  Reducer.f,
  reduxCompose(redux.applyMiddleware(reduxThunk))
);
export default store;
