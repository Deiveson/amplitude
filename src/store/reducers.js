import { combineReducers } from "redux";
import { searchReducer } from "../Views/Search/searchReducer";
import { reducer as toastrReducer } from "react-redux-toastr";

export default combineReducers({
  search: searchReducer,
  toastr: toastrReducer
});
