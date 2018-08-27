import * as axios from "axios";
import * as moment from "moment";
import * as redux from "redux";
import * as Domain from "tv/shared/domain";
import * as Actions from "tv/frontend/redux/ducks/actions";
import { getAxios } from "tv/frontend/services/axiosConfig";
import * as cache from "tv/frontend/services/cache";
import * as conf from "tv/frontend/services/conf";
const base = conf.serverUrl;

type D = Actions.ThisDispatch;

function extractData(response: axios.AxiosResponse): any {
  return response.data;
}

export function allShows(dispatch: D): Promise<Domain.Show[]> {
  return cache.cached("all-shows", () => {
    return getAxios(dispatch)
      .get(`${base}/shows`)
      .then(extractData);
  });
}

export function searchShows(dispatch: D, q: string): Promise<Domain.Show[]> {
  return cache.cached("all-shows-" + q, () => {
    return getAxios(dispatch)
      .get(`${base}/shows`, { params: { q } })
      .then(extractData);
  });
}

export function seasonsOfShow(
  dispatch: D,
  showId: number
): Promise<Domain.MSeason[]> {
  return cache.cached(`seasons-of-${showId}`, () => {
    return getAxios(dispatch)
      .get(`${base}/shows/${showId}/seasons`)
      .then(extractData)
      .then((data: Domain.Season[]) => {
        return data.map(season => {
          return {
            ...season,
            time: {
              start: moment(season.time.start),
              end: moment(season.time.end)
            }
          };
        });
      });
  });
}

export function userShows(dispatch: D): Promise<Domain.Show[]> {
  return getAxios(dispatch)
    .get(`${base}/me/shows`)
    .then()
    .then(extractData);
}

export function defaultShows(dispatch: D): Promise<Domain.Show[]> {
  return cache.cached("default-shows", () => {
    return getAxios(dispatch)
      .get(`${base}/shows/default`)
      .then()
      .then(extractData);
  });
}

export async function followShow(dispatch: D, id: number): Promise<void> {
  try {
    await getAxios(dispatch).post(`${base}/me/shows/${id}`);
  } catch (err) {
    const e: axios.AxiosError = err;
    // we tolerate the conflict
    // so we can follow something we followed already
    if (!e.response || e.response.status !== 409) {
      throw e;
    }
  }
}

export async function unfollowShow(dispatch: D, id: number): Promise<void> {
  await getAxios(dispatch).delete(`${base}/me/shows/${id}`);
}
