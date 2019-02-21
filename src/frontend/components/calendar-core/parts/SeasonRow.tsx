import * as React from 'react'
import * as Domain from 'tv/shared/domain'
import { getStyleForPeriodInYear } from 'tv/frontend/components/utils/styleUtils'
import { pickFunkyColor } from 'tv/frontend/components/utils/funkyColor'

// Displays a given season of a serie
const SeasonRow: React.SFC<{
  year: number
  season: Domain.SeasonWithShow
  index: number
  showRemoveButtons: boolean
  onClose: () => void
}> = ({ year, season, index, showRemoveButtons, onClose }) => {
  const { show, number: seasonNumber, time } = season
  const { start, end } = time
  const closingButton = showRemoveButtons ? (
    <button onClick={onClose} className='calendar-core__season-close'>
      &times;
    </button>
  ) : null
  return (
    <div className='calendar-core__season-row'>
      <div
        className='calendar-core__season'
        style={{
          ...getStyleForPeriodInYear({
            year,
            start,
            end,
          }),
          backgroundColor: pickFunkyColor(show.name),
          zIndex: 100 + index,
        }}
      >
        {closingButton}
        <span className='calendar-core__season-name'>
          {show.name.toUpperCase()}&nbsp;S{seasonNumber}
        </span>
      </div>
    </div>
  )
}

export default SeasonRow
