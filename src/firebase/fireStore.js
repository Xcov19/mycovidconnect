/* jshint esversion: 9 */

import firebaseConfig from "./firebase-core";
import CONSTANTS from "./constants";

class FireStore {
  static #FIREBASE_OBJ;
  static #DB;

  /** Initialize Firebase
   *
   * @param {Object.<T>} firebase - Firebase library.
   * @author codecakes
   */
  static firebaseInit(firebase) {
    if (!!window && !!window.firebase && !FireStore.#FIREBASE_OBJ) {
      // eslint-disable-next-line no-undef
      const firebase = window.firebase;
      firebase.initializeApp(firebaseConfig) && firebase.analytics();
      FireStore.#FIREBASE_OBJ = firebase;
      FireStore.#DB = firebase.firestore();
    }
  }

  /**
   * Requested Callback function passed
   *
   * @callback CallBack
   * @param {Object<string|number, Object>}
   */
  /**
   * Fetch all data points of by City.
   *
   * @param {string} cityName - Name of the city.
   * @param {CallBack} mapCallback - callback function to process results on a map.
   */
  static fetchCityData(cityName, mapCallback) {
    const cityNameCollectionPath = CONSTANTS.collectionCityPathFn(cityName);
    const results = {};
    FireStore.#DB
      .collection(cityNameCollectionPath)
      .get()
      .then((/** @type {Object.<T>} */ querySnapshot) => {
        querySnapshot.forEach((/** @type {Object<T>} */ docRef) => {
          const docData = docRef.data();
          ["columns", "records"].forEach((key) => {
            if (key in docData) {
              docData[key] = JSON.parse(docData[key]);
            }
          });
          // fetch(
          //   `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&sensor=true&key=${GOOGLE_MAPS_API_KEY}`
          // )
          //   .then((response) => response.json())
          //   .then((data) => {
          //     const main_pint = data.results[0];
          //     const position =
          //       main_pint.geometry &&
          //       main_pint.geometry.location &&
          //       main_pint.geometry.location !== {}
          //         ? main_pint.geometry.location
          //         : {};
          //   });
          // docData.location = position;
          results[docRef.id] = docData;
        });
        console.info("results is", results);
        return results;
      })
      .then(mapCallback)
      .catch((error) => console.error(error));
  }
}

export default FireStore;
