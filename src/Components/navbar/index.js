import React, { Component } from "react";
import logo from "../../assets/img/logo-amp.svg";
import InputSearch from "../fields/input-search";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SearchActions from "../../Views/Search/searchActions";
import history from "../../history";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.interval = () => {};
  }
  search(val) {
    if (!this.props.isLoading) {
      this.props.setLoading(true);
      history.push("/");
    }
    if (val) {
      clearTimeout(this.interval);
      this.interval = setTimeout(() => this.props.searchAll({ q: val }), 1000);
    }
  }
  render() {
    return (
      <header className="amp-navbar">
        <picture
          className="amp-navbar__logo cursor-pointer"
          onClick={() => history.replace("/")}
        >
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
