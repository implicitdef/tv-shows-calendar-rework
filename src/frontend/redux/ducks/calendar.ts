import { ActionsUnion, createAction } from '@martin_hotell/rex-tils'
import moment from 'moment'
import { createSelector } from 'reselect'
import { TheState } from 'tv/frontend/redux/state'
import { SeasonWithShow } from 'tv/shared/domain'

export type CalendarState = {
  year: number
  seasons: SeasonWithShow[]
}

export const initial: CalendarState = {
  year: moment().year(),
  seasons: [],
}

const rootSelector = (state: TheState) => state.calendar
export const yearSelector = createSelector(
  rootSelector,
  _ => _.year,
)
export const seasonsSelector = createSelector(
  rootSelector,
  _ => _.seasons,
)

export const SET_SEASONS = 'calendar.SET_SEASONS'
export const MODIFY_YEAR = 'calendar.MODIFY_YEAR'

export const calendarActions = {
  registerSeasons: (value: SeasonWithShow[]) =>
    createAction(SET_SEASONS, value),
  incrementYear: () => createAction(MODIFY_YEAR, 1),
  decrementYear: () => createAction(MODIFY_YEAR, -1),
}

export type CalendarAction = ActionsUnion<typeof calendarActions>

export default (
  state: CalendarState = initial,
  action: CalendarAction,
): CalendarState => {
  switch (action.type) {
    case SET_SEASONS: {
      return {
        ...state,
        seasons: action.payload,
      }
    }
    case MODIFY_YEAR: {
      return {
        ...state,
        year: state.year + action.payload,
      }
    }
    default:
      return state
  }
}
