import "babel-polyfill";
import "bootstrap/dist/css/bootstrap.css";
const style = require("tv/frontend/style/index.scss");
import * as $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "tv/frontend/components/App";

$(() => {
  console.log(
    `Frontend code started with process.env.NODE_ENV = `,
    process.env.NODE_ENV
  );
  ReactDOM.render(App.rootElement, document.getElementById("root"));
});
