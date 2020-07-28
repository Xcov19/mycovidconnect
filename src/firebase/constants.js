/* jshint esversion: 6 */

const CONSTANTS = {
    /**
     * @param {string} cityName - Name of city to query hospitals for
     * @returns {string} - collection path
     */
    collectionCityPathFn: (cityName) => `covidbedstatus/city/${cityName}`,
}

export default CONSTANTS;