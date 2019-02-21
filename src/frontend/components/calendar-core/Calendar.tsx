import * as moment from 'moment'
import * as React from 'react'
import Marker from 'tv/frontend/components/calendar-core/parts/Marker'
import MonthsBackground from 'tv/frontend/components/calendar-core/parts/MonthsBackground'
import MonthsRow from 'tv/frontend/components/calendar-core/parts/MonthsRow'
import SeasonRow from 'tv/frontend/components/calendar-core/parts/SeasonRow'
import * as authDuck from 'tv/frontend/redux/ducks/auth'
import { TheState } from 'tv/frontend/redux/state'
import * as followingThunk from 'tv/frontend/redux/thunks/following'
import { useThisDispatch, useThisMappedState } from 'tv/frontend/redux/utils'
import * as DateUtils from 'tv/frontend/services/dateUtils'

export default function Calendar() {
  const mapState = React.useCallback(
    (state: TheState) => ({
      year: state.calendar.year,
      seasons: state.calendar.seasons,
      showRemoveButtons: authDuck.loggedInStatusSelector(state) === 'loggedIn',
    }),
    [],
  )
  const { year, seasons, showRemoveButtons } = useThisMappedState(mapState)
  const dispatch = useThisDispatch()
  const now = moment()
  const marker = now.year() === year ? <Marker now={now} /> : ''
  return (
    <div className='calendar'>
      <div className='col-12 calendar__inner'>
        {marker}
        <MonthsBackground year={year} />
        <MonthsRow year={year} />
        {seasons
          .filter(season => {
            return DateUtils.isTimeRangeInYear(season.time, year)
          })
          .map((season, index) => {
            const onClose = () =>
              dispatch(followingThunk.unfollowShow(season.show.id))
            return (
              <SeasonRow
                key={`${season.show.id}S${season.number}`}
                index={index}
                season={season}
                year={year}
                onClose={onClose}
                showRemoveButtons={showRemoveButtons}
              />
            )
          })}
      </div>
    </div>
  )
}
