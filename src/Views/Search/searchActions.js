import queryString from "query-string";
import {
  fetchSecurity,
  reqGetJsonToken,
  reqPutJsonToken,
  SPOTIFY_API_URL
} from "../../Components/utils/restUtils";
import { SearchTypes } from "../../store/actionTypes";
import { toastr } from "react-redux-toastr";

export const searchAll = (search, type, limit, call = () => {}) => {
  return dispatch => {
    fetchSecurity(
      `${SPOTIFY_API_URL}/search?${
        type ? `type=${type}&` : "type=album,track,artist&"
      }${limit ? `limit=${limit}&` : "limit=3&"}${queryString.stringify(
        search
      )}`,
      reqGetJsonToken(),
      resp => {
        call(resp);
        dispatch({ type: SearchTypes.SET_SEARCH_VALUE, searchValue: search });
        return dispatch({ type: SearchTypes.GET_LIST, list: resp });
      }
    ).finally(() => dispatch(setLoading(false)));
  };
};

export const getAlbum = (id, call = () => {}) => {
  return dispatch => {
    dispatch(setLoadingData(true));
    fetchSecurity(
      `${SPOTIFY_API_URL}/albums/${id}`,
      reqGetJsonToken(),
      resp => {
        call(resp);
        return dispatch({ type: SearchTypes.GET_DATA, data: resp });
      }
    ).finally(() => dispatch(setLoadingData(false)));
  };
};

export const getTopTracks = (id, call = () => {}) => {
  return dispatch => {
    dispatch(setLoadingData(true));
    fetchSecurity(
      `${SPOTIFY_API_URL}/artists/${id}/top-tracks?country=from_token`,
      reqGetJsonToken(),
      resp => {
        call(resp);
        return dispatch({ type: SearchTypes.GET_TOP_TRACKS, top: resp });
      }
    ).finally(() => dispatch(setLoadingData(false)));
  };
};

export const getArtist = (id, call = () => {}) => {
  return dispatch => {
    dispatch(setLoadingData(true));
    fetchSecurity(
      `${SPOTIFY_API_URL}/artists/${id}`,
      reqGetJsonToken(),
      resp => {
        call(resp);
        return dispatch({ type: SearchTypes.GET_ARTIST, artist: resp });
      }
    ).finally(() => dispatch(setLoadingData(false)));
  };
};

export const getArtistAlbuns = (id, call = () => {}) => {
  return dispatch => {
    dispatch(setLoadingData(true));
    fetchSecurity(
      `${SPOTIFY_API_URL}/artists/${id}/albums`,
      reqGetJsonToken(),
      resp => {
        call(resp);
        return dispatch({ type: SearchTypes.GET_ARTIST_ALBUMS, albums: resp });
      }
    ).finally(() => dispatch(setLoadingData(false)));
  };
};

export const saveMusic = (id, call = () => {}) => {
  return dispatch => {
    fetchSecurity(
      `${SPOTIFY_API_URL}/me/tracks`,
      { ...reqPutJsonToken(), body: JSON.stringify({ ids: [id] }) },
      resp => {}
    ).finally(() => {
      toastr.success("Pronto!", "Música favoritada com sucesso");
    });
  };
};

export const setLoadingData = value => {
  return dispatch => {
    dispatch({
      type: SearchTypes.SET_LOADING_DATA,
      value
    });
  };
};

export const setLoading = value => {
  return dispatch => {
    dispatch({
      type: SearchTypes.SET_LOADING,
      value
    });
  };
};
