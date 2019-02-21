import * as _ from "lodash";
import * as moment from "moment";
import * as React from "react";
import MonthBox from "tv/frontend/components/calendar-core/parts/MonthBox";

type ThisProps = {
  year: number;
};

// Lists the months at the top of the parts
const MonthsRow: React.SFC<ThisProps> = ({ year }) => (
  <div className="calendar__months-row">
    {_.range(0, 12).map(monthNumber => {
      return (
        <MonthBox
          year={year}
          key={monthNumber}
          monthNumber={monthNumber}
          className="calendar__month-name"
        >
          {moment(year, "YYYY")
            .month(monthNumber)
            .format("MMMM")
            .toLowerCase()}
        </MonthBox>
      );
    })}
  </div>
);

export default MonthsRow;
