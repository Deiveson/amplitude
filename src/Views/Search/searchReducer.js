import { SearchTypes } from "../../store/actionTypes";

const INITIAL_STATE = {
  list: {},
  searchValue: "",
  isLoading: false,
  data: {},
  loadingData: false
};

export function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SearchTypes.GET_LIST:
      return {
        ...state,
        list: action.list
      };
    case SearchTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.value
      };
    case SearchTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue
      };
    case SearchTypes.GET_DATA:
      return {
        ...state,
        data: action.data
      };
    case SearchTypes.SET_LOADING_DATA:
      return {
        ...state,
        loadingData: action.value
      };
    case SearchTypes.GET_ARTIST:
      return {
        ...state,
        data: { ...state.data, ...action.artist }
      };
    case SearchTypes.GET_ARTIST_ALBUMS:
      return {
        ...state,
        data: { ...state.data, albums: action.albums }
      };
    case SearchTypes.GET_TOP_TRACKS:
      return {
        ...state,
        data: { ...state.data, topTracks: action.top }
      };
    default:
      return state;
  }
}
