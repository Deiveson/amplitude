import React from "react";
import noImage from "../../assets/img/no-image.png";

const ApresentationCard = props => {
  const {
    info = () => {},
    extraInfo = () => {},
    name = "",
    image = ""
  } = props;
  return (
    <div className="apresentation-card">
      <picture
        className="apresentation-card__photo"
        style={{
          backgroundImage: `url(${image ? image : noImage})`
        }}
      />
      <div className="apresentation-card__data">
        <div className="apresentation-card__data__name">{name}</div>
        <div className="apresentation-card__data__infos">{info()}</div>
        <div className="apresentation-card__data__time">{extraInfo()}</div>
      </div>
    </div>
  );
};

export default ApresentationCard;
