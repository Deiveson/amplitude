import { SearchTypes } from "../../store/actionTypes";

const INITIAL_STATE = {
  list: [],
  searchValue: ""
};

export function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SearchTypes.GET_LIST:
      return {
        ...state,
        list: action.list,
        searchValue: action.searchValue
      };
    default:
      return state;
  }
}
