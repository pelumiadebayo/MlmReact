import { combineReducers } from "redux";
import auth from "./auth";
import message from "./messages";
//combined reducers
export default combineReducers({
  auth,
  message,
});