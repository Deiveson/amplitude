import { SearchTypes } from "../../store/actionTypes";

const INITIAL_STATE = {
  list: {},
  searchValue: "",
  isLoading: false
};

export function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SearchTypes.GET_LIST:
      return {
        ...state,
        list: action.list
      };
    case SearchTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue
      };
    case SearchTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.load.loadValue,
        searchValue: action.load.searchValue
      };
    default:
      return state;
  }
}
