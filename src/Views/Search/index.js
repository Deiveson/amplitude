import React, { Component } from "react";
import LoadingCard from "../../Components/cards/loading-apresentation-card";
import { bindActionCreators } from "redux";
import * as SearchActions from "./searchActions";
import { connect } from "react-redux";
import ApresentationCard from "../../Components/cards/apresentation-card";
import { msToMin, renderArtists } from "../../Components/utils/fnUtils";
import Rating from "../../Components/rating-stars";

class Search extends Component {
  renderSection(name, itens, typeShow) {
    return (
      <section>
        <div className="section-title">{name}</div>
        <div className="section-itens">{itens}</div>
        <div className="section-show-all">
          <span
            onClick={() =>
              this.props.searchAll(this.props.searchValue, typeShow, 50)
            }
          >
            MOSTRAR TUDO
          </span>
        </div>
      </section>
    );
  }

  renderTrackCard(track) {
    let image = "";
    if (track.album && track.album.images) image = track.album.images[1].url;
    return (
      <ApresentationCard
        name={track.name}
        info={() => <>Música - {renderArtists(track.artists)}</>}
        extraInfo={() => msToMin(track.duration_ms)}
        image={image}
        id={track.id}
        star
        startFn={id => this.props.saveMusic(id)}
      />
    );
  }
  renderArtistCard(artist) {
    let image = "";
    if (artist.images && artist.images[1]) image = artist.images[1].url;
    else if (artist.images && artist.images[0]) image = artist.images[1].url;
    return (
      <ApresentationCard
        name={artist.name}
        info={() => (
          <>
            Artista <Rating value={artist.popularity} />
          </>
        )}
        image={image}
        id={artist.id}
        type="artista"
      />
    );
  }
  renderAlbumCard(album) {
    let image = "";
    let type = "";
    if (album.images) image = album.images[1].url;
    switch (album.album_type) {
      case "album":
        type = "Álbum";
        break;
      case "single":
        type = "Single";
        break;
      default:
        type = "Álbum";
    }
    return (
      <ApresentationCard
        name={album.name}
        info={() => (
          <>
            {type} - {renderArtists(album.artists)}
          </>
        )}
        image={image}
        id={album.id}
        type="album"
      />
    );
  }

  renderSearched() {
    const { tracks = {}, albums = {}, artists = {} } = this.props.list;
    let searchedTracks = "";
    let searchedAlbums = "";
    let searchedArtists = "";

    if (tracks.items && tracks.items.length > 0) {
      searchedTracks = tracks.items.map(track => this.renderTrackCard(track));
      searchedTracks = this.renderSection("Músicas", searchedTracks, "track");
    }
    if (albums.items && albums.items.length > 0) {
      searchedAlbums = albums.items.map(album => this.renderAlbumCard(album));
      searchedAlbums = this.renderSection("Álbuns", searchedAlbums, "album");
    }
    if (artists.items && artists.items.length > 0) {
      searchedArtists = artists.items.map(artist =>
        this.renderArtistCard(artist)
      );
      searchedArtists = this.renderSection(
        "Artistas",
        searchedArtists,
        "artist"
      );
    }
    return (
      <>
        {searchedTracks}
        {searchedAlbums}
        {searchedArtists}
      </>
    );
  }

  render() {
    return (
      <div className="search-view">
        {this.props.isLoading ? (
          <>
            <section>
              <div className="section-title">Músicas</div>
              <div className="section__itens">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </div>
            </section>
            <section>
              <div className="section-title">Albúns</div>
              <div className="section__itens">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </div>
            </section>
          </>
        ) : (
          this.renderSearched()
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.search });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...SearchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
