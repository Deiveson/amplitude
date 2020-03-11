import { combineReducers } from "redux";
import { searchReducer } from "../Views/Search/searchReducer";

export default combineReducers({
  search: searchReducer
});
