import React from "react";
import noImage from "../../assets/img/no-image.png";
import history from "../../history";
import Icon from "../icon";

const ApresentationCard = props => {
  const {
    info = () => {},
    extraInfo = () => {},
    name = "",
    image = "",
    id = "",
    type = "",
    star = false
  } = props;
  return (
    <div className="apresentation-card">
      <div className="apresentation-card__container">
        <div
          tabIndex={1}
          className={`apresentation-card__container__photo ${
            type ? "cursor-pointer" : ""
          }`}
          style={{
            backgroundImage: `url(${image ? image : noImage})`
          }}
          onClick={() => (type ? history.push(`/${type}/${id}`) : () => {})}
        />
        <div className="apresentation-card__container__data">
          <div
            className={`apresentation-card__container__data__name ${
              type ? "cursor-pointer bborder-bottom-hover" : ""
            }`}
            tabIndex={1}
            onClick={() => (type ? history.push(`/${type}/${id}`) : () => {})}
          >
            {name}
          </div>
          <div className="apresentation-card__container__data__infos">
            {info()}
          </div>
          <div className="apresentation-card__container__data__time">
            {extraInfo()}
          </div>
        </div>
      </div>
      {star ? <Icon value="star" className="cursor-pointer" onClick={() => props.startFn(id)} /> : ""}
    </div>
  );
};

export default ApresentationCard;
