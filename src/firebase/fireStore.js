/* jshint esversion: 9 */
/* jshint esversion: 6 */

import firebaseConfig from "./firebase-core";
import { GOOGLE_MAPS_API_KEY } from "../constants";
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
    /** @constant {Array<Object<String, String>, Promise>} */
    const results = [];
    const querySnapshotResults = [];
    /**
     * Final hospital mapped data that is consumed by mapCallback.
     * @constant {Array<Object<string, Array|string|Object<T>>>}
     */
    const hospitalArrMapData = [];
    // IIFE with synchronouse flow of async/awaits
    (async () => {
      // Get database records for the collection name.
      const querySnapshot = await FireStore.#DB
        .collection(cityNameCollectionPath)
        .get();
      // Get list of records objects.
      querySnapshot.forEach((docRef, index) => {
        const docData = docRef.data();
        const promise = new Promise((resolve) =>
          resolve(JSON.parse(docData.records))
        );
        querySnapshotResults.push(promise);
      });
      // Get Location telemetry from Google Maps Api.
      const hospitalRecordsResults = await Promise.all(querySnapshotResults);
      const promiseData = hospitalRecordsResults.map(
        async (hospitalRecords) => {
          if (!!hospitalRecords) {
            const mappedData = hospitalRecords.map(async (item) => {
              const name = item.facility_type;
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${name},${cityName}&sensor=true&key=${GOOGLE_MAPS_API_KEY}`
              );
              results.push([item, response.json()]);
            });
            await Promise.all(mappedData);
            return results;
          }
        }
      );
      // Merge each hospital records data with its geolocation meta and invoke callback.
      await Promise.all(promiseData);
      const mappedData = results.map((data) => {
        /** @type {Array<Object<String, String>, Promise>} */
        const [item, promise] = data;
        promise.then((result) => {
          if (!!result && result.results.length && !result.error_message) {
            // Called for each hospital result.
            hospitalArrMapData.push({ ...result.results[0], ...item });
          }
        }).catch(console.error);
        return '';
      });
      await Promise.all(mappedData);
      mapCallback(hospitalArrMapData);
    })();
  }
}

export default FireStore;
