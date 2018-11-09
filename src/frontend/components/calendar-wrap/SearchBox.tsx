import * as React from "react";
import { connect } from "react-redux";
import * as Domain from "tv/shared/domain";
import * as calendarFollowing from "tv/frontend/redux/ducks/calendar/following";
import * as duckCalendarSearch from "tv/frontend/redux/ducks/calendar/search";
import * as State from "tv/frontend/redux/ducks/state";

interface ThisProps {
  shows: Domain.Show[];
  open: boolean;
  input: string;
  onInput: (input: string) => void;
  onSubmit: (selectedShow: Domain.Show) => void;
  onBlur: () => void;
  onOpen: () => void;
}

interface ThisState {
  input: string;
}

export default class SearchBox extends React.Component<ThisProps, ThisState> {
  public render() {
    return (
      <div className="search-box">
        <input
          type="text"
          className="search-box__input"
          onChange={this.handleInputChange}
          value={this.props.input}
          onFocus={this.props.onOpen}
          placeholder="Add a TV show"
        />
        <div className="search-box__results">
          <ul className="search-box__results-inner">
            {this.props.open &&
              this.props.shows.slice(0, 10).map(show => {
                return (
                  <li
                    key={show.id}
                    onClick={() => {
                      this.props.onSubmit(show);
                    }}
                  >
                    {show.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }

  private handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.props.onInput(e.target.value);
  };
}
