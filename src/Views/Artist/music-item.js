import React from "react";
import Icon from "../../Components/icon";
import { msToMin, renderArtists } from "../../Components/utils/fnUtils";

const MusicItem = props => {
  return (
    <div className="music-item">
      <div className="music-item__data">
        <Icon value="star" className="music-item__data__star" />
        <div>
          <div className="music-item__data__name">{props.name}</div>
          <div className="music-item__data__artists">
            {renderArtists(props.artists)}
          </div>
        </div>
      </div>
      <div className="music-item__time">{msToMin(props.time)}</div>
    </div>
  );
};

export default MusicItem;
