import queryString from "query-string";
import {
  fetchSecurity,
  reqGetJsonToken,
  SPOTIFY_API_URL
} from "../../Components/utils/restUtils";
import { SearchTypes } from "../../store/actionTypes";

export const searchAll = (search, type, call = () => {}) => {
  return dispatch => {
    fetchSecurity(
      `${SPOTIFY_API_URL}/search?${
        type ? type : "type=album,track,artist&"
      }${queryString.stringify(search)}`,
      reqGetJsonToken(),
      resp => {
        call(resp);
        dispatch({ type: SearchTypes.SET_SEARCH_VALUE, searchValue: search });
        return dispatch({ type: SearchTypes.GET_LIST, list: resp });
      }
    ).finally(() => dispatch(setLoading(false)));
  };
};

export const setLoading = value => {
  return dispatch => {
    dispatch({
      type: SearchTypes.SET_LOADING,
      load: { loadValue: value }
    });
  };
};
