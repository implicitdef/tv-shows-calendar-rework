import "babel-polyfill";
import "bootstrap/dist/css/bootstrap.css";
import * as ReactDOM from "react-dom";
import * as App from "tv/frontend/components/App";
import * as Actions from "tv/frontend/redux/actions";
import * as authThunk from "tv/frontend/redux/thunks/auth";
import * as google from "tv/frontend/services/google";
import Store from "tv/frontend/redux/store";
require("tv/frontend/style/index.scss");

window.addEventListener("load", () => {
  console.log(
    `Frontend code started with process.env.NODE_ENV = ${process.env.NODE_ENV}`
  );
  google.setup();
  const dispatch = Store.dispatch as Actions.ThisDispatch;
  dispatch(authThunk.checkStatusOnStartupAndFetch());
  ReactDOM.render(App.rootElement, document.getElementById("root"));
});
