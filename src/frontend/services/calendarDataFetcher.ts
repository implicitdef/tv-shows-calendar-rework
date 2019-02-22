import * as Api from 'tv/frontend/services/api'
import { Wirings } from 'tv/frontend/services/axiosConfig'
import { MSeason, Show, SeasonWithShow } from 'tv/shared/domain'

function flatten<A>(arrayOfArrays: A[][]): A[] {
  return arrayOfArrays.reduce((a, b) => a.concat(b), [])
}

function reformatSeason(season: MSeason, show: Show): SeasonWithShow {
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

function getShowsToDisplay(
  wirings: Wirings,
  isLoggedIn: boolean,
): Promise<Show[]> {
  if (isLoggedIn) {
    return Api.userShows(wirings)
  }
  return Api.defaultShows(wirings)
}

export function getSeasonsWithShows(
  wirings: Wirings,
  isLoggedIn: boolean,
): Promise<SeasonWithShow[]> {
  return getShowsToDisplay(wirings, isLoggedIn).then(shows => {
    return Promise.all(
      shows.map(s => buildSeasonsWithShowForShow(wirings, s)),
    ).then(flatten)
  })
}
