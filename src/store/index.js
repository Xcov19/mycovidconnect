import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import logger from "redux-logger";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

const initialState = {};
const isDev = process.env.NODE_ENV === "development" ? true : false;
const sagaMiddleware = createSagaMiddleware();
const middlewares =
  isDev === true ? [logger, sagaMiddleware] : [sagaMiddleware];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
