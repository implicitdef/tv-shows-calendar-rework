import * as moment from "moment";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as Domain from "tv/shared/domain";

export type T = {
  auth: authDuck.ThisState;
  meta: metaDuck.ThisState;
  calendar: {
    year: number;
    seasons: Domain.SeasonWithShow[];
    search: {
      results: Domain.Show[];
      input: string;
      open: boolean;
    };
  };
};

export function initial(): T {
  return {
    auth: authDuck.initial,
    meta: metaDuck.initial,
    calendar: {
      year: moment().year(),
      seasons: [],
      search: {
        results: [],
        input: "",
        open: false
      }
    }
  };
}

export type Selector<A> = (state: T) => A;
