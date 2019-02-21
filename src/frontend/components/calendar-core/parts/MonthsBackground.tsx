import * as _ from 'lodash'
import * as React from 'react'
import { getStyleForMonthInYear } from 'tv/frontend/components/utils/styleUtils'

// Columns suggesting the months behind the series
const MonthsBackground: React.SFC<{
  year: number
}> = ({ year }) => (
  <div className='calendar-core__months-background'>
    {_.range(0, 12).map(monthNumber => {
      return (
        <div
          style={getStyleForMonthInYear({ year, monthNumber })}
          key={monthNumber}
          className='calendar__month-column'
        />
      )
    })}
  </div>
)
export default MonthsBackground
