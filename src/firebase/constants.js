/* jshint esversion: 6 */

const CONSTANTS = {
    /**
     * @param {string} cityName - Name of city to query hospitals for
     * @returns {string} - collection path
     */
    collectionCityPathFn: (cityName) => `covidbedstatus/city/${cityName}`,
    FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL: process.env.REACT_APP_FIREBASE_DB_URL,
    FIREBASE_PROJECT_ID: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MSG_SENDER_ID: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
    FIREBASE_APP_ID: process.env.REACT_APP_FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

export default CONSTANTS;
