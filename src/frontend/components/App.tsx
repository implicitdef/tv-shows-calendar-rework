import * as React from "react";
import { Provider } from "react-redux";
import About from "tv/frontend/components/meta/About";
import AuthBar from "tv/frontend/components/meta/AuthBar";
import Store from "tv/frontend/redux/store";
import GlobalErrorBanner from "tv/frontend/components/meta/GlobalErrorBanner";
import { StoreContext } from "redux-react-hook";
import CalendarBar from "tv/frontend/components/calendar-wrap/CalendarBar";
import Calendar from "tv/frontend/components/calendar-core/Calendar";

const App: React.SFC<{}> = ({}) => {
  return (
    <StoreContext.Provider value={Store}>
      <Provider store={Store}>
        <div className="page container-fluid">
          <GlobalErrorBanner />
          <AuthBar />
          <About />
          <CalendarBar />
          <Calendar />
        </div>
      </Provider>
    </StoreContext.Provider>
  );
};

export const instance = <App />;
