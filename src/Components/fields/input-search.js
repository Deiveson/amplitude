import React, { Component } from "react";
import Icon from "../icon";

export default class InputSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  render() {
    return (
      <div className="search">
        <input
          className="search__input"
          placeholder="Pesquisar"
          onChange={e =>
            this.setState({ value: e.target.value }, () =>
              this.props.onChange(this.state.value)
            )
          }
          value={this.state.value}
        />
        <Icon
          value="times"
          className={`search__close ${this.state.value && "show-clear"}`}
          onClick={() => this.setState({ value: "" })}
        />
      </div>
    );
  }
}
