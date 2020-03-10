import React from "react";
import logo from "../../assets/img/logo-amp.svg";
import SpotifyButton from "../buttons/spot-button";
import Icon from "../icon";
import { login } from "../../auth";

const PopUp = ({ isOpen = false }) => {
  return (
    <div className={`popup ${isOpen ? "popup__show" : ""}`}>
      <div
        className={`popup__container ${
          isOpen ? "popup__fade-in" : "popup__fade-out"
        }`}
      >
        <div className="popup__container__header">
          <picture>
            <img src={logo} alt="logo" />
          </picture>
          <span>Amplitude</span>
        </div>
        <div className="popup__container__body">
          <p>Para usar nossos serviços é necessário logar com Spotify</p>
          <SpotifyButton
            className={"popup__container__body--login-button"}
            onClick={() => login()}
          >
            <Icon type="brand" value="spotify" className="mr-1" />
            Efetuar Login
          </SpotifyButton>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
