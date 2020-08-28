import { APP_READ_LOCATION_REQUEST } from "../constants/action-types";

const doReadLocation = (payload) => {
  return {
    type: APP_READ_LOCATION_REQUEST,
    payload,
  };
};

export { doReadLocation };
