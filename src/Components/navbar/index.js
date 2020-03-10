import React, { Component } from "react";
import logo from "../../assets/img/logo-amp.svg";
import InputSearch from "../fields/input-search";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: "" };
    this.interval = () => {};
  }
  search(val) {
    this.setState({ searchValue: val });
    clearTimeout(this.interval);
    this.interval = setTimeout(() => console.log("executou", val), 1000);
  }
  render() {
    return (
      <header className="amp-navbar">
        <picture className="amp-navbar__logo">
          <img src={logo} alt="amplitude" />
        </picture>
        <div className="amp-navbar__search">
          <InputSearch onChange={val => this.search(val)} />
        </div>
        <div></div>
      </header>
    );
  }
}
