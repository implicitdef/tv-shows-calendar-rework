import * as React from "react";
import { connect, Provider } from "react-redux";
import { store } from "tv/frontend/redux/setup";
import FullCalendar from "tv/frontend/components/calendar-wrap/FullCalendar";
import IntegrationPage from "tv/frontend/components/IntegrationPage";
import TruePage from "tv/frontend/components/TruePage";

export const rootElement = (
  <Provider store={store}>
    <TruePage />
  </Provider>
);
