import React from "react";

const AlbumItem = props => {
  const { image = [{}], name = "", year = "" } = props;
  return (
    <div className="album-item">
      <div
        className="album-item__photo"
        style={{
          backgroundImage: `url(${image[0].url})`
        }}
      />
      <div className="album-item__data">
        <span className="album-item__data__name">{name}</span>
        <div className="album-item__data__date">
          Álbum - {new Date(year).getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default AlbumItem;
