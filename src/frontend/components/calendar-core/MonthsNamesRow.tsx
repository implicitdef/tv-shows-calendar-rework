import * as _ from 'lodash'
import moment from 'moment'
import * as React from 'react'
import { getStyleForMonthInYear } from 'tv/frontend/components/utils/styleUtils'

// Lists the months at the top of the parts
const MonthsNamesRow: React.SFC<{
  year: number
}> = ({ year }) => (
  <div className='calendar-core__months-names-row'>
    {_.range(0, 12).map(monthNumber => {
      return (
        <div
          style={getStyleForMonthInYear({ year, monthNumber })}
          key={monthNumber}
          className='calendar-core__month-name'
        >
          {moment(year, 'YYYY')
            .month(monthNumber)
            .format('MMMM')
            .toLowerCase()}
        </div>
      )
    })}
  </div>
)

export default MonthsNamesRow
