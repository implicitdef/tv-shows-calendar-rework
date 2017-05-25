import * as React from "react";
import * as ReactRedux from "react-redux";
import * as ReduxSetup from "tv/frontend/redux/setup";
import FullCalendar from "tv/frontend/components/calendar-wrap/FullCalendar";
import IntegrationPage from "tv/frontend/components/IntegrationPage";
import TruePage from "tv/frontend/components/TruePage";

interface Props {
  hasError: boolean;
}

export const rootElement =
  <ReactRedux.Provider store={ReduxSetup.store}>
    <TruePage/>
  </ReactRedux.Provider>;
