import React from "react";
import logo from "../../assets/img/logo-amp.svg";
import SpotifyButton from "../../Components/buttons/spot-button";
import { login } from "../../auth";
import Icon from "../../Components/icon";

const Login = props => {
  return (
    <section className="login">
      <div className="login__container">
        <div className="login__container__header">
          <picture>
            <img src={logo} alt="logo" />
          </picture>
          <span>Amplitude</span>
        </div>
        <div className="login__container__body">
          <p className="login__container__body__text">
            Para usar nossos serviços, é necessário logar-se com Spotify
          </p>
          <SpotifyButton
            className={"popup__container__body--login-button"}
            onClick={() => login()}
          >
            <Icon type="brand" value="spotify" className="mr-1" />
            Efetuar Login
          </SpotifyButton>
        </div>
      </div>
    </section>
  );
};

export default Login;
