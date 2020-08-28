import { all } from "redux-saga/effects";
import appActionWatchers from "./app";

export default function* rootSaga() {
  yield all([appActionWatchers()]);
}
