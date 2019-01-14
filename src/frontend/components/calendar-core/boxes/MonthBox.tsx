import * as moment from "moment";
import * as React from "react";
import PeriodInYearBox from "tv/frontend/components/calendar-core/boxes/PeriodInYearBox";

// Generic div to represente a month of some year
// with automatic width and horizontal position

type ThisProps = {
  year: number;
  monthNumber: number;
  children?: React.ReactNode;
  className?: string;
};

const MonthBox: React.SFC<ThisProps> = ({
  year,
  monthNumber,
  children,
  className: className
}) => (
  <PeriodInYearBox
    className={className}
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
