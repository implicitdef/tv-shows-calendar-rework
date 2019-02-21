import * as React from 'react'
import * as Domain from 'tv/shared/domain'
import { getStyleForPeriodInYear } from 'tv/frontend/components/utils/getPeriodInYearStyle'

const colors = [
  '#f44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFC107',
  '#FF9800',
  '#FF5722',
]

const alwaysPositiveModulo = (nb: number, divider: number): number => {
  // http://stackoverflow.com/questions/4467539/javascript-modulo-not-behaving
  return ((nb % divider) + divider) % divider
}

const hashOfStr = (str: string): number => {
  // http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
  let hash = 0,
    i,
    chr,
    len
  if (str.length === 0) return hash
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
  return hash
}

const pickColor = (inputStr: string): string => {
  return colors[alwaysPositiveModulo(hashOfStr(inputStr), colors.length)]
}

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
    <button onClick={onClose} className='calendar__season-close'>
      &times;
    </button>
  ) : null
  return (
    <div className='calendar__season-row'>
      <div
        className='calendar__season'
        style={{
          ...getStyleForPeriodInYear({
            year,
            start,
            end,
          }),
          backgroundColor: pickColor(show.name),
          zIndex: 100 + index,
        }}
      >
        {closingButton}
        <span className='calendar__season-name'>
          {show.name.toUpperCase()}&nbsp;S{seasonNumber}
        </span>
      </div>
    </div>
  )
}

export default SeasonRow
