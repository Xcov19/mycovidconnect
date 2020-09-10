/* jshint esversion: 6 */

import CONSTANTS from "./constants";


// Your web app's Firebase configuration
/** @type {Map<string, string} */
const firebaseConfig = {
    apiKey: CONSTANTS.FIREBASE_API_KEY,
    authDomain: CONSTANTS.FIREBASE_AUTH_DOMAIN,
    databaseURL: CONSTANTS.FIREBASE_DB_URL,
    projectId: CONSTANTS.FIREBASE_PROJECT_ID,
    storageBucket: CONSTANTS.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: CONSTANTS.FIREBASE_MSG_SENDER_ID,
    appId: CONSTANTS.FIREBASE_APP_ID,
    measurementId: CONSTANTS.FIREBASE_MEASUREMENT_ID,
};


export default firebaseConfig;