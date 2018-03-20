import * as moment from "moment";
import * as React from "react";
import * as Domain from "tv/shared/domain";
import * as Calendar from "tv/frontend/components/calendar-core/Calendar";
import * as CalendarBar from "tv/frontend/components/calendar-wrap/CalendarBar";

const FullCalendar: React.SFC<{}> = ({}) => {
  const calendarBarProps = {
    year: 2015,
    showAddShowButton: false,
    onSetYear: () => {},
    searchShows: [],
    searchNotFound: false,
    searchOnInput: () => {},
    searchOnSubmit: () => {}
  };
  const calendarProps = {
    year: 2015,
    seasons: [],
    showRemoveButtons: false,
    onShowRemove: () => {}
  };
  return (
    <div className="full-calendar">
      <CalendarBar.connected />
      <Calendar.connected />
    </div>
  );
};

export default FullCalendar;
