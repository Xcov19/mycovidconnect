import {
  APP_READ_LOCATION_REQUEST,
  APP_READ_LOCATION_SUCCESS,
  APP_READ_LOCATION_FAILURE,
} from "../constants/action-types";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  locationDetails: {},
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case APP_READ_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: "",
        locationDetails: {},
      };
    case APP_READ_LOCATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: payload.message,
        locationDetails: payload.data,
      };
    case APP_READ_LOCATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: payload.message,
        locationDetails: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default appReducer;
