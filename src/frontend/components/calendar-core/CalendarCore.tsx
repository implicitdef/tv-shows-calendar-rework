import moment from 'moment'
import * as React from 'react'
import Marker from 'tv/frontend/components/calendar-core/Marker'
import MonthsBackground from 'tv/frontend/components/calendar-core/MonthsBackground'
import MonthsNamesRow from 'tv/frontend/components/calendar-core/MonthsNamesRow'
import SeasonRow from 'tv/frontend/components/calendar-core/SeasonRow'
import { TheState } from 'tv/frontend/redux/state'
import * as followingThunk from 'tv/frontend/redux/thunks/following'
import { useThisDispatch, useThisMappedState } from 'tv/frontend/redux/utils'
import { loggedInStatusSelector } from 'tv/frontend/redux/ducks/auth'
import { isTimeRangeInYear } from 'tv/frontend/services/dateUtils'

export default function CalendarCore() {
  const mapState = React.useCallback(
    (state: TheState) => ({
      year: state.calendar.year,
      seasons: state.calendar.seasons,
      showRemoveButtons: loggedInStatusSelector(state) === 'loggedIn',
    }),
    [],
  )
  const { year, seasons, showRemoveButtons } = useThisMappedState(mapState)
  const dispatch = useThisDispatch()
  const now = moment()
  const marker = now.year() === year ? <Marker now={now} /> : ''
  return (
    <div className='calendar-core'>
      <div className='col-12 calendar-core__inner'>
        {marker}
        <MonthsBackground year={year} />
        <MonthsNamesRow year={year} />
        {seasons
          .filter(season => {
            return isTimeRangeInYear(season.time, year)
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
