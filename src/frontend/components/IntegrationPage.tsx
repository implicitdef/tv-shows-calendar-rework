import * as moment from "moment";
import * as React from "react";
import Calendar from "tv/frontend/components/calendar-core/Calendar";
import CalendarBar from "tv/frontend/components/calendar-wrap/CalendarBar";
import AuthBar from "tv/frontend/components/meta/AuthBar";
import GlobalErrorBanner from "tv/frontend/components/meta/GlobalErrorBanner";

const noop = () => {};

const IntegrationPage: React.SFC<{}> = ({}) => {
  return (
    <div className="integration">
      <GlobalErrorBanner hasError />
      <AuthBar
        loggedIn
        email={"george@gmail.com"}
        onClickAbout={noop}
        onLogin={noop}
        onLogout={noop}
      />
      <CalendarBar
        year={2000}
        showAddShowButton
        onSetYear={noop}
        searchShows={[]}
        searchInput={""}
        searchOpen={true}
        searchOnInput={noop}
        searchOnSubmit={noop}
        searchOnBlur={noop}
        searchOnOpen={noop}
      />
      <CalendarBar
        year={2000}
        showAddShowButton
        onSetYear={noop}
        searchShows={[
          { id: 33, name: "A show" },
          { id: 35, name: "Another" },
          { id: 36, name: "Yet a show" }
        ]}
        searchInput={""}
        searchOpen={true}
        searchOnInput={noop}
        searchOnSubmit={noop}
        searchOnBlur={noop}
        searchOnOpen={noop}
      />
      <Calendar
        year={1492}
        mockedNow={moment("1492-03-25")}
        seasons={[
          {
            show: { id: 33, name: "A show" },
            number: 1,
            time: {
              start: moment("1492-01-10"),
              end: moment("1492-02-25")
            }
          },
          {
            show: { id: 33, name: "A show" },
            number: 2,
            time: {
              start: moment("1492-01-01"),
              end: moment("1492-01-02")
            }
          },
          {
            show: { id: 33, name: "A show" },
            number: 3,
            time: {
              start: moment("1500-01-10"),
              end: moment("1500-02-25")
            }
          },
          {
            show: { id: 55, name: "Another" },
            number: 1,
            time: {
              start: moment("1492-10-15"),
              end: moment("1495-10-15")
            }
          }
        ]}
        showRemoveButtons={true}
        onShowRemove={noop}
      />
    </div>
  );
};

export default IntegrationPage;
