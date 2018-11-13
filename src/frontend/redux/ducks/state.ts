import * as moment from "moment";
import * as newAuthDuck from "tv/frontend/redux/ducks/newAuth";
import * as Domain from "tv/shared/domain";

export type T = {
  newAuth: newAuthDuck.ThisState;
  calendar: {
    year: number;
    seasons: Domain.SeasonWithShow[];
    search: {
      results: Domain.Show[];
      input: string;
      open: boolean;
    };
  };
  meta: {
    about: boolean;
    hasGlobalError: boolean;
    runningCalls: number;
  };
};

export function initial(): T {
  return {
    newAuth: newAuthDuck.initial,
    calendar: {
      year: moment().year(),
      seasons: [],
      search: {
        results: [],
        input: "",
        open: false
      }
    },
    meta: {
      about: false,
      hasGlobalError: false,
      runningCalls: 0
    }
  };
}

export type Selector<A> = (state: T) => A;
