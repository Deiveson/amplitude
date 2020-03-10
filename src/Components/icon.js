import React from "react";
import PropTypes from "prop-types";

const Icon = props => {
  const { onClick = () => {} } = props;
  let type;
  switch (props.type) {
    case "solid":
      type = "fas";
      break;
    case "brand":
      type = "fab";
      break;
    default:
      type = "fa";
  }
  return (
    <i
      className={`${type} fa-${props.value} ${props.className}`}
      onClick={() => onClick()}
    />
  );
};

Icon.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Icon;
