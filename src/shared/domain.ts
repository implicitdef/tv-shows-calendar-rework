import { Moment } from 'moment'

export type Show = {
  id: number
  name: string
}
export type Season = {
  id: number
  number: number
  time: TimeRange
}

export type MSeason = {
  id: number
  number: number
  time: MTimeRange
}

export type ShowAndSeasons = {
  serie: Show
  seasons: Season[]
}

export type TimeRange = {
  start: string
  end: string
}

export type MTimeRange = {
  start: Moment
  end: Moment
}

export type SeasonWithShow = {
  show: Show
  number: number
  time: MTimeRange
}
