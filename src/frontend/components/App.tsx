import * as React from "react";
import { Provider } from "react-redux";
import IntegrationPage from "tv/frontend/components/IntegrationPage";
import TruePage from "tv/frontend/components/TruePage";
import Store from "tv/frontend/redux/store";

const displayIntegrationPage = false;

export const rootElement = displayIntegrationPage ? (
  <IntegrationPage />
) : (
  <Provider store={Store}>
    <TruePage />
  </Provider>
);
