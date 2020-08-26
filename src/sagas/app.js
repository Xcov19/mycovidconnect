import { put, takeLatest, call } from "redux-saga/effects";
import {
  APP_READ_LOCATION_REQUEST,
  APP_READ_LOCATION_SUCCESS,
  APP_READ_LOCATION_FAILURE,
} from "../constants/action-types";
import { doReadLocationApi } from "../apis";

function* doReadLocation({ type, payload: { city } }) {
  if (city === "" || city === null || city === undefined) {
    yield put({
      type: APP_READ_LOCATION_FAILURE,
      payload: {
        message: "City not found",
      },
    });
  } else {
    let data = {
      city,
    };
    try {
      let response = yield call(doReadLocationApi, data);
      if (response && response.data) {
        const { message, status, data } = response.data;
        if (status === "success") {
          yield put({
            type: APP_READ_LOCATION_SUCCESS,
            payload: {
              message: "",
              data,
            },
          });
        } else {
          yield put({
            type: APP_READ_LOCATION_FAILURE,
            payload: {
              message,
            },
          });
        }
      }
    } catch (e) {
      yield put({
        type: APP_READ_LOCATION_FAILURE,
        payload: {
          message: "Unknown error occurred, Try again",
        },
      });
    }
  }
}

function* appActionWatchers() {
  yield takeLatest(APP_READ_LOCATION_REQUEST, doReadLocation);
}

export default appActionWatchers;
