import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const composeEnhancers = composeWithDevTools || compose;
export const Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
