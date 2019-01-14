import * as React from "react";
import { Provider } from "react-redux";
import TruePage from "tv/frontend/components/TruePage";
import Store from "tv/frontend/redux/store";

export const rootElement = 
  <Provider store={Store}>
    <TruePage />
  </Provider>
);
