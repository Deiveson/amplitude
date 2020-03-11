import React from "react";

const LoadingCard = props => {
  return (
    <div className="loading-card">
      <div className="loading-card__photo"></div>
      <div className="loading-card__data">
        <div className="loading-card__data__name"></div>
        <div className="loading-card__data__infos"></div>
        <div className="loading-card__data__time"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
