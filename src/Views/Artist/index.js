import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as SearchActions from "../Search/searchActions";
import { connect } from "react-redux";
import LoadingSpinner from "../../Components/loading-spinner";
import MusicItem from "../Album/music-item";

import Rating from "../../Components/rating-stars";
import AlbumItem from "./album-item";
class Artist extends Component {
  componentDidMount() {
    this.props.getArtist(this.props.match.params.id);
    this.props.getArtistAlbuns(this.props.match.params.id);
    this.props.getTopTracks(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getArtist(this.props.match.params.id);
      this.props.getArtistAlbuns(this.props.match.params.id);
      this.props.getTopTracks(this.props.match.params.id);
    }
  }

  render() {
    const { data = {} } = this.props;
    const { topTracks = {}, albums = {} } = data;
    const { tracks = [] } = topTracks;
    const { items = [] } = albums;
    if (this.props.loadingData) {
      return (
        <div className="w-100 text-center">
          <LoadingSpinner />
        </div>
      );
    } else if (data.id) {
      return (
        <section className="artist-view">
          <div className="artist-view__header">
            <div
              className="artist-view__header__photo"
              style={{
                backgroundImage: `url(${data.images[0].url})`
              }}
            />
            <div className="artist-view__header__data">
              <div className="artist-view__header__data--name">{data.name}</div>
              <div className="artist-view__header__data--rating">
                <Rating value={data.popularity} />
              </div>
            </div>
          </div>
          <div className="artist-view__top-tracks">
            <div className="artist-view__top-tracks__title">Mais Tocadas</div>
            {tracks.slice(0, 5).map((track, i) => {
              return (
                <MusicItem
                  key={"track" + i}
                  id={track.id}
                  name={track.name}
                  artists={track.artists}
                  time={track.duration_ms}
                  starFn={id => this.props.saveMusic(id)}
                />
              );
            })}
          </div>
          <div className="artist-view__albums">
            <div className="artist-view__albums__title">Álbuns</div>
            <div className="artist-view__albums__itens">
              {items.slice(0, 3).map((album, i) => (
                <AlbumItem
                  key={"album" + i}
                  image={album.images}
                  name={album.name}
                  year={album.release_date}
                  id={album.id}
                />
              ))}
            </div>
          </div>
        </section>
      );
    } else return <div>Não foram encontrados dados para o ID informado</div>;
  }
}
const mapStateToProps = state => ({ ...state.search });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...SearchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
