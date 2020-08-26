import { combineReducers } from "redux";
import apphReducer from "./app";

export default combineReducers({
  app: apphReducer,
});
