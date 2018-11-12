import * as moment from "moment";
import * as React from "react";
import * as DateUtils from "tv/frontend/services/dateUtils";
import PeriodInYearBox from "tv/frontend/components/calendar-core/boxes/PeriodInYearBox";

// Generic div to represente an arbitrary period of time in a year
// with automatic width and horizontal position

type ThisProps = {
  year: number;
  monthNumber: number;
  children?: React.ReactNode;
  specificClassName?: string;
};

const MonthBox: React.SFC<ThisProps> = ({
  year,
  monthNumber,
  children,
  specificClassName
}) => (
  <PeriodInYearBox
    specificClassName={specificClassName}
    year={year}
    start={moment(year, "YYYY")
      .month(monthNumber)
      .startOf("month")}
    end={moment(year, "YYYY")
      .month(monthNumber)
      .endOf("month")}
  >
    {children}
  </PeriodInYearBox>
);
export default MonthBox;
