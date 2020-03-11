import React from "react";
import history from "../../history";

const AlbumItem = props => {
  const { image = [{}], name = "", year = "", id = "" } = props;
  return (
    <div
      className="album-item cursor-pointer"
      tabIndex={1}
      onClick={() => history.push(`/album/${id}`)}
    >
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
