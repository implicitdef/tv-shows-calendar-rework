import * as moment from "moment";
import * as React from "react";
import { getStyleForPeriodInYear } from "tv/frontend/components/utils/getPeriodInYearStyle";

// Generic div to represente a month of some year
// with automatic width and horizontal position

const MonthBox: React.SFC<{
  year: number;
  monthNumber: number;
  children?: React.ReactNode;
  className?: string;
}> = ({ year, monthNumber, children, className: className }) => {
  const start = moment(year, "YYYY")
    .month(monthNumber)
    .startOf("month");
  const end = moment(year, "YYYY")
    .month(monthNumber)
    .endOf("month");
  return (
    <div
      style={getStyleForPeriodInYear({
        year,
        start,
        end
      })}
      className={className}
    >
      {children}
    </div>
  );
};
export default MonthBox;
