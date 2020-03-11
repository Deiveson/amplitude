import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as SearchActions from "../Search/searchActions";
import { connect } from "react-redux";
import LoadingSpinner from "../../Components/loading-spinner";
import MusicItem from "./music-item";

class Album extends Component {
  componentDidMount() {
    this.props.getAlbum(this.props.match.params.id);
  }

  renderArtists(artists) {
    return artists.reduce((acc, item) => {
      return `${item.name}${acc ? `, ${acc}` : ""}`;
    }, "");
  }

  renderMusicList() {}

  render() {
    const { data = {} } = this.props;
    if (this.props.loadingData) {
      return (
        <div className="w-100 text-center">
          <LoadingSpinner />
        </div>
      );
    } else if (data.id) {
      return (
        <section className="album-view">
          <div className="album-view__header">
            <div
              className="album-view__header__photo"
              style={{
                backgroundImage: `url(${data.images[0].url})`
              }}
            />
            <div className="album-view__header__data">
              <div className="album-view__header__data--name">{data.name}</div>
              <div className="album-view__header__data--artist">
                {this.renderArtists(data.artists)}
              </div>
            </div>
          </div>
          <div className="album-view__musics">
            <MusicItem />
          </div>
        </section>
      );
    } else return <div>Não foram encontrados dados para o ID informado</div>;
  }
}
const mapStateToProps = state => ({ ...state.search });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...SearchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Album);
