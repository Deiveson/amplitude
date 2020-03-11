import React from "react";
import Icon from "../../Components/icon";

const MusicItem = props => {
  return (
    <div className="music-item">
      <div className="music-item__data">
        <Icon value="star" className="music-item__data__star" />
        <div>
          <div className="music-item__data__name">Minha Música</div>
          <div className="music-item__data__artists">
            Um Barril de Rap, Jean Tassy
          </div>
        </div>
      </div>
      <div className="music-item__time">3:44</div>
    </div>
  );
};

export default MusicItem;
