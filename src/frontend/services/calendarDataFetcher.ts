import * as Api from 'tv/frontend/services/api'
import { Wirings } from 'tv/frontend/services/axiosAndApolloConfig'
import { Show, SeasonWithShow, Season } from 'tv/shared/domain'
import { Moment } from 'moment'

function flatten<A>(arrayOfArrays: A[][]): A[] {
  return arrayOfArrays.reduce((a, b) => a.concat(b), [])
}

function reformatSeason(season: Season<Moment>, show: Show): SeasonWithShow {
  return {
    show,
    number: season.number,
    time: season.time,
  }
}

function buildSeasonsWithShowForShow(
  wirings: Wirings,
  show: Show,
): Promise<SeasonWithShow[]> {
  return Api.seasonsOfShow(wirings, show.id).then(seasons => {
    return seasons.map(season => reformatSeason(season, show))
  })
}

function getShowsToDisplay(wirings: Wirings): Promise<Show[]> {
  return Api.meShows(wirings)
}

export function getSeasonsWithShows(
  wirings: Wirings,
): Promise<SeasonWithShow[]> {
  return getShowsToDisplay(wirings).then(shows => {
    // TODO no need for multiple queries now that we have graphql
    return Promise.all(
      shows.map(show => buildSeasonsWithShowForShow(wirings, show)),
    ).then(flatten)
  })
}
