import { Moment } from 'moment'

type TimesType = string | Moment
type IdType = string | number

export type Show<I extends IdType = string> = {
  id: I
  name: string
}
export type ShowForGraphql = {
  id: string
  name: string
  seasons: Season<string>[]
}
export type ShowAndSeasons<I extends IdType = string> = {
  serie: Show<I>
  seasons: Season<string>[]
}
export type SeasonWithShow = {
  show: Show
  number: string
  time: TimeRange<Moment>
}
export type Season<T extends TimesType = Moment> = {
  number: string
  time: TimeRange<T>
}
export type TimeRange<T extends TimesType = Moment> = {
  start: T
  end: T
}
// In the JSON stored in DB, the ids are numbers
// We turn them to string in the rest of the code to comply with GraphQL
export type DataFromDb = Array<ShowAndSeasons<number>>
