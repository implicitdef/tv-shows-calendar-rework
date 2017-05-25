import * as moment from "moment";

export interface Show {
  id: number;
  name: string;
}
export interface Season {
  id: number;
  number: number;
  time: TimeRange;
}

export interface MSeason {
  id: number;
  number: number;
  time: MTimeRange;
}

export interface ShowAndSeasons {
  serie: Show;
  seasons: Season[];
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface MTimeRange {
  start: moment.Moment;
  end: moment.Moment;
}

export interface SeasonWithShow {
  show: Show;
  number: number;
  time: MTimeRange;
}
