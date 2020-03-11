import queryString from "query-string";
import {
  fetchSecurity,
  reqGetJsonToken,
  SPOTIFY_API_URL
} from "../../Components/utils/restUtils";
import { SearchTypes } from "../../store/actionTypes";

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
