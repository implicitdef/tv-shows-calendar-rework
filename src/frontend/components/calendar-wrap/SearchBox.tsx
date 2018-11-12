import * as React from "react";
import * as Domain from "tv/shared/domain";

type ThisProps = {
  shows: Domain.Show[];
  open: boolean;
  input: string;
  onInput: (input: string) => void;
  onSubmit: (selectedShow: Domain.Show) => void;
  onBlur: () => void;
  onOpen: () => void;
};

type ThisState = {
  input: string;
};

export default class SearchBox extends React.Component<ThisProps, ThisState> {
  public render() {
    return (
      <div className="search-box">
        <input
          type="text"
          className="search-box__input"
          onChange={e => this.props.onInput(e.target.value)}
          value={this.props.input}
          onFocus={this.props.onOpen}
          placeholder="Add a TV show"
        />
        <div className="search-box__results">
          <ul className="search-box__results-inner">
            {this.props.open &&
              this.props.shows.slice(0, 10).map(show => (
                <li
                  key={show.id}
                  onClick={() => {
                    this.props.onSubmit(show);
                  }}
                >
                  {show.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
