import React, { Component } from "react";
import LoadingCard from "../../Components/cards/loading-apresentation-card";
import { bindActionCreators } from "redux";
import * as SearchActions from "./searchActions";
import { connect } from "react-redux";
import ApresentationCard from "../../Components/cards/apresentation-card";

class Search extends Component {
  render() {
    const { tracks = {} } = this.props.list;
    return (
      <div className="search-view overflow-hidden">
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
          <section>
            {tracks.items ? (
              <>
                <div className="section-title">Músicas</div>
                <div className="section__itens">
                  {tracks.items.map(track => (
                    <ApresentationCard name={track.name} />
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </section>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.search });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...SearchActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
