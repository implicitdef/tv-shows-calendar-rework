import * as _ from "lodash";
import * as React from "react";
import MonthBox from "tv/frontend/components/calendar-core/parts/MonthBox";

type ThisProps = {
  year: number;
};

// Columns suggesting the months behind the series
const MonthsBackground: React.SFC<ThisProps> = ({ year }) => (
  <div className="calendar__months-background">
    {_.range(0, 12).map(monthNumber => {
      return (
        <MonthBox
          year={year}
          key={monthNumber}
          monthNumber={monthNumber}
          className="calendar__month-column"
        />
      );
    })}
  </div>
);
export default MonthsBackground;
