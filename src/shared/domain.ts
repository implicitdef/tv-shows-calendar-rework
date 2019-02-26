import { Moment } from 'moment'

type TimesType = string | Moment

export type Show = {
  id: number
  name: string
}
export type ShowAndSeasons = {
  serie: Show
  seasons: Season<string>[]
}
export type SeasonWithShow = {
  show: Show
  number: number
  time: TimeRange<Moment>
}
export type Season<T extends TimesType> = {
  number: number
  time: TimeRange<T>
}
export type TimeRange<T extends TimesType> = {
  start: T
  end: T
}
