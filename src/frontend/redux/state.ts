import * as moment from "moment";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as calendarDuck from "tv/frontend/redux/ducks/calendar";
import * as Domain from "tv/shared/domain";

export type T = {
  auth: authDuck.ThisState;
  meta: metaDuck.ThisState;
  search: searchDuck.ThisState;
  calendar: calendarDuck.ThisState;
};

// we should be able to remove that
export function initial(): T {
  return {
    auth: authDuck.initial,
    meta: metaDuck.initial,
    search: searchDuck.initial,
    calendar: calendarDuck.initial
  };
}

export type Selector<A> = (state: T) => A;
