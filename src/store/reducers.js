import { combineReducers } from "redux";
import { searchReducer } from "../Views/Home/searchReducer";

export default combineReducers({
  search: searchReducer
});
