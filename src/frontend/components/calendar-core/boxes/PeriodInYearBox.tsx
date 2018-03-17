import * as moment from "moment";
import * as React from "react";
import * as DateUtils from "tv/frontend/services/dateUtils";

// Generic div to represente an arbitrary period of time in a year
// with automatic width and horizontal position

interface ThisProps {
  specificClassName?: string;
  year: number;
  start: moment.Moment;
  end: moment.Moment;
  zIndex?: number;
  children?: React.ReactNode;
  specificColor?: string;
}

const PeriodInYearBox: React.SFC<ThisProps> = ({
  specificClassName,
  year,
  start,
  end,
  zIndex,
  children,
  specificColor
}) => {
  const startInYear = DateUtils.bringDateInYear(start, year);
  const endInYear = DateUtils.bringDateInYear(end, year);
  const leftOffset = DateUtils.dateLeftOffset(startInYear);
  const width = DateUtils.offsetBetween(startInYear, endInYear);
  const style = {
    left: `${leftOffset}%`,
    // We set both width and minWidth, but only one of them
    // is used depending if we're :hover or not.
    // cf override in CSS
    minWidth: `${width}%`,
    width: `${width}%`,
    zIndex,
    backgroundColor: specificColor
  };
  return (
    <div className={specificClassName} style={style}>
      {children}
    </div>
  );
};
export default PeriodInYearBox;
