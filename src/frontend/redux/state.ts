import * as moment from "moment";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as Domain from "tv/shared/domain";

export type T = {
  auth: authDuck.ThisState;
  meta: metaDuck.ThisState;
  search: searchDuck.ThisState;
  calendar: {
    year: number;
    seasons: Domain.SeasonWithShow[];
  };
};

export function initial(): T {
  return {
    auth: authDuck.initial,
    meta: metaDuck.initial,
    search: searchDuck.initial,
    calendar: {
      year: moment().year(),
      seasons: []
    }
  };
}

export type Selector<A> = (state: T) => A;
