import React from "react";
import history from "../../history";
export const msToMin = millis => {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const renderArtists = artists => {
  if (artists && artists.map) {
    return artists.map((artist, i) => {
      if (i + 1 < artists.length) {
        return (
          <>
            <span
              className="artist-link"
              onClick={() => history.push(`/artista/${artist.id}`)}
            >
              {artist.name}
            </span>
            ,{"  "}
          </>
        );
      } else
        return (
          <>
            <span
              className="artist-link"
              onClick={() => history.push(`/artista/${artist.id}`)}
            >
              {artist.name}
            </span>
          </>
        );
    });
  }
  return "";
};
