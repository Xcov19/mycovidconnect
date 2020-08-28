import FireStore from "../firebase/fireStore";

/**
 * TODO(@ksr89): Remove this. Use the code this anywhere to access data.
 * Output like map of:
 * Covid Care Centres CCC: {…}, Government Hospitals Covid Beds: {…},..
 */
const doReadLocationApi = () => {
  console.log("calling function");
  FireStore.firebaseInit();
  FireStore.fetchCityData("bangalore", console.log);
};

export { doReadLocationApi };
