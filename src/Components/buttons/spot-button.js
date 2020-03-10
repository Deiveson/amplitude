import React from "react";
import PropTypes from "prop-types";

const SpotifyButton = ({ onClick = () => {}, children, className = "" }) => {
  return (
    <button className={`spotify-button ${className}`} onClick={() => onClick()}>
      {children}
    </button>
  );
};

SpotifyButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default SpotifyButton;
