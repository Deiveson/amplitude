import React from "react";

const ApresentationCard = props => {
  return (
    <div className="apresentation-card">
      <picture
        className="apresentation-card__photo"
        style={{
          backgroundImage: `url(https://abrilveja.files.wordpress.com/2017/12/vai-malandra-2.jpg)`
        }}
      />
      <div className="apresentation-card__data">
        <div className="apresentation-card__data__name">{props.name}</div>
        <div className="apresentation-card__data__infos">
          música - Anitta e J.Balvin
        </div>
        <div className="apresentation-card__data__time">6:33</div>
      </div>
    </div>
  );
};

export default ApresentationCard;
