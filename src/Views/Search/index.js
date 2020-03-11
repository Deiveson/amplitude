import React, { Component } from "react";
import LoadingCard from "../../Components/cards/loading-apresentation-card";
import { bindActionCreators } from "redux";
import * as SearchActions from "./searchActions";
import { connect } from "react-redux";
import ApresentationCard from "../../Components/cards/apresentation-card";
import { msToMin } from "../../Components/utils/fnUtils";
import Rating from "../../Components/rating-stars";

class Search extends Component {
  renderSection(name, itens) {
    return (
      <section>
        <div className="section-title">{name}</div>
        <div className="section-itens">{itens}</div>
        <div className="section-show-all">
          <span>MOSTRAR TUDO</span>
        </div>
      </section>
    );
  }

  renderTrackCard(track) {
    let artists = "";
    let image = "";
    if (track.artists.length === 1) {
      artists = track.artists[0].name;
    } else {
      artists = track.artists.reduce((acc, item) => {
        return `${item.name}${acc ? `, ${acc}` : ""}`;
      }, "");
    }
    if (track.album && track.album.images) image = track.album.images[1].url;
    return (
      <ApresentationCard
        name={track.name}
        info={() => <>Música - {artists}</>}
        extraInfo={() => <>{msToMin(track.duration_ms)}</>}
        image={image}
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
      />
    );
  }
  renderAlbumCard(album) {
    let artists = "";
    let image = "";
    let type = "";
    if (album.artists.length === 1) {
      artists = album.artists[0].name;
    } else {
      artists = album.artists.reduce((acc, item, idx) => {
        if (idx + 1 >= album.artists.length) {
          return `${item.name}${acc ? `, ${acc}` : ""}`;
        }
        return `${item.name}${acc ? ` e ${acc}` : ""}`;
      }, "");
    }
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
            {type} - {artists}
          </>
        )}
        image={image}
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
      searchedTracks = this.renderSection("Músicas", searchedTracks);
    }
    if (albums.items && albums.items.length > 0) {
      searchedAlbums = albums.items.map(album => this.renderAlbumCard(album));
      searchedAlbums = this.renderSection("Álbuns", searchedAlbums);
    }
    if (artists.items && artists.items.length > 0) {
      searchedArtists = artists.items.map(artist =>
        this.renderArtistCard(artist)
      );
      searchedArtists = this.renderSection("Artistas", searchedArtists);
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
