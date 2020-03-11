import React from "react";
import noImage from "../../assets/img/no-image.png";
import history from "../../history";

const ApresentationCard = props => {
  const {
    info = () => {},
    extraInfo = () => {},
    name = "",
    image = "",
    id = "",
    type = ""
  } = props;
  return (
    <div className="apresentation-card">
      <picture
        className={`apresentation-card__photo ${type ? "cursor-pointer" : ""}`}
        style={{
          backgroundImage: `url(${image ? image : noImage})`
        }}
        onClick={() => (type ? history.push(`/${type}/${id}`) : () => {})}
      />
      <div className="apresentation-card__data">
        <div
          className={`apresentation-card__data__name ${
            type ? "cursor-pointer bborder-bottom-hover" : ""
          }`}
          tabIndex={1}
          onClick={() => (type ? history.push(`/${type}/${id}`) : () => {})}
        >
          {name}
        </div>
        <div className="apresentation-card__data__infos">{info()}</div>
        <div className="apresentation-card__data__time">{extraInfo()}</div>
      </div>
    </div>
  );
};

export default ApresentationCard;
