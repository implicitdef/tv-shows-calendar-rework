import * as Domain from "tv/shared/domain";
import * as State from "tv/frontend/redux/ducks/state";
import * as Api from "tv/frontend/services/api";

function flatten<A>(arrayOfArrays: A[][]): A[] {
  return arrayOfArrays.reduce((a, b) => a.concat(b), []);
}

function reformatSeason(
  season: Domain.MSeason,
  show: Domain.Show
): Domain.SeasonWithShow {
  return {
    show,
    number: season.number,
    time: season.time
  };
}

function buildSeasonsWithShowForShow(
  dispatch: State.ThisDispatch,
  show: Domain.Show
): Promise<Domain.SeasonWithShow[]> {
  return Api.seasonsOfShow(dispatch, show.id).then(seasons => {
    return seasons.map(season => reformatSeason(season, show));
  });
}

function getShowsToDisplay(
  dispatch: State.ThisDispatch,
  isLoggedIn: boolean
): Promise<Domain.Show[]> {
  if (isLoggedIn) {
    return Api.userShows(dispatch);
  }
  return Api.defaultShows(dispatch);
}

export function getSeasonsWithShows(
  dispatch: State.ThisDispatch,
  isLoggedIn: boolean
): Promise<Domain.SeasonWithShow[]> {
  return getShowsToDisplay(dispatch, isLoggedIn).then(shows => {
    return Promise.all(
      shows.map(s => buildSeasonsWithShowForShow(dispatch, s))
    ).then(flatten);
  });
}
