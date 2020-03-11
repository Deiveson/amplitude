import React, { Component } from "react";
import logo from "../../assets/img/logo-amp.svg";
import InputSearch from "../fields/input-search";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SearchActions from "../../Views/Search/searchActions";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.interval = () => {};
  }
  search(val) {
    if (val) {
      this.props.setLoading(true);
      clearTimeout(this.interval);
      this.interval = setTimeout(() => this.props.searchAll({ q: val }), 1000);
    }
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

const mapStateToProps = state => ({ ...state.search });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...SearchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
