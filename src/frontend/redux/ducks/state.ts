import * as moment from "moment";
import * as redux from "redux";
import * as Domain from "tv/shared/domain";
import * as google from "tv/frontend/services/google";

export interface T {
  auth: {
    loggedIn: boolean;
    userInfo: google.User | null;
  };
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
}

export function initial(): T {
  return {
    auth: {
      loggedIn: false,
      userInfo: null
    },
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
