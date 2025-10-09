import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import MaindHOC from "../components/MainHOC";
import FireStore from "../firebase/fireStore";
import Map from "../components/Map";
import { withAuth0 } from "@auth0/auth0-react";
import { compose } from "recompose";
import Login from "../components/Login";

import {
  GOOGLE_MAPS_API_KEY,
  UBER_CLIENT_ID,
  alternativeCityNamesLookup,
  ESP_PROXY_DOMAIN,
  ESP_PROXY_PORT,
} from "../constants";
import LoginButton from "../components/LoginButton";
import EmptyState from "../components/EmptyState";
import SkeletonList from "../components/SkeletonList";
import Toast from "../components/Toast";
import SOSButton from "../components/SOSButton";
import {
  buildGoogleMapsLink,
  saveLastContext,
  loadLastContext,
  coerceLatLngFromParams,
  isValidLatitude,
  isValidLongitude,
  saveCityCache,
  loadCityCache,
  isTestMode,
  getTestLocation,
} from "../utils/validation";

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;

/**
 * The Search Component.
 *
 * @class Search
 * @extends React.Component
 */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: parseFloat(this.props.match.params.lat) || 0,
      lng: parseFloat(this.props.match.params.lng) || 0,
      selectedLat: 0,
      selectedLng: 0,
      city: "",
      pickupAddress: "",
      results: [],
      isLoading: true,
      isAndroid: /Android/i.test(navigator.userAgent),
      isIos: /iPhone|iPod|iPad/.test(navigator.platform),
      toast: null,
    };
  }

  /**
   * Find and update city name from current latitude and longitude
   * @fires Search#getAddressFromLocation
   */
  getAddressFromLocation = () => {
    const { lat, lng } = this.state;
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const main_pint = data.results[0];
        const locality = (main_pint?.address_components || [])?.filter((x) =>
          x.types?.includes("locality")
        );
        const city = locality[0]?.long_name || "";
        if (!city) {
          this.setState({ isLoading: false });
          return;
        }
        /**
         *  Callback function passed
         * @callback CallBack
         */
        /** Set current city name.
         * @event Search#getAddressFromLocation
         * @type {updater}
         * @property {city} state.city
         * @property {CallBack} getLocationResults
         */
        this.setState(
          {
            city: city.toLowerCase(),
            pickupAddress: main_pint?.formatted_address || "",
          },
          () => this.getLocationResults()
        );
        saveLastContext({ lat, lng, city });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ isLoading: false, toast: { kind: "error", message: "Failed to resolve address.", retry: this.getAddressFromLocation } });
      });
  };

  /**
   * Store search results in state
   *
   * @fires Search#setResults
   */

  setResults = (results) => {
    /** Set list of hospitals in result.
     * @event setResults
     * @type {updater}
     * @property {results} state.results
     * @property {selectedLat} state.selectedLat
     *  @property {selectedLng} state.selectedLng
     *  @property {isLoading} state.isLoading
     */

    this.setState({
      results,
      selectedLat: (results[0]?.geometry?.location || {}).lat,
      selectedLng: (results[0]?.geometry?.location || {}).lng,
      isLoading: false,
    });
  };

  /**
   * Set results and save to cache for future use
   */
  setResultsWithCache = (results) => {
    // Save to cache
    const { city } = this.state;
    const normalizedCity = alternativeCityNamesLookup[city] || city;
    saveCityCache(normalizedCity, results);
    
    // Set results in state
    this.setResults(results);
  };

  /**
   * Fetch list of hospitals available in current city
   * First checks cache, then falls back to Firebase if cache is empty/expired
   */
  getLocationResults = () => {
    let { city } = this.state;
    city = alternativeCityNamesLookup[city] || city;
    
    // Check cache first
    const cachedResults = loadCityCache(city);
    if (cachedResults && cachedResults.length > 0) {
      console.log(`Using cached results for ${city}`);
      this.setResults(cachedResults);
      return;
    }
    
    // Cache miss or expired - fetch from Firebase
    console.log(`Cache miss for ${city}, fetching from Firebase`);
    try {
      FireStore.firebaseInit();
      FireStore.fetchCityData(city, this.setResultsWithCache);
    } catch (e) {
      console.error(e);
      this.setState({ isLoading: false, toast: { kind: "error", message: "Failed to load facilities.", retry: this.getLocationResults } });
    }
  };

  setNewLocation = (lat, lng) => {
    this.setState({
      selectedLat: lat,
      selectedLng: lng,
    });
  };

  componentDidMount() {
    // Check if test mode is enabled
    if (isTestMode()) {
      const testLocation = getTestLocation();
      console.log('Test mode enabled, using hardcoded location:', testLocation);
      this.setState({ 
        lat: testLocation.lat, 
        lng: testLocation.lng, 
        city: testLocation.city || "" 
      }, this.getAddressFromLocation);
      return;
    }

    const params = coerceLatLngFromParams(this.props.match.params || {});
    const last = loadLastContext();
    if (params && isValidLatitude(params.lat) && isValidLongitude(params.lng)) {
      this.setState({ lat: params.lat, lng: params.lng }, this.getAddressFromLocation);
      return;
    }
    if (last) {
      this.setState({ lat: last.lat, lng: last.lng, city: last.city || "" }, this.getAddressFromLocation);
      return;
    }
    const { lat, lng } = this.state;
    if ((!lat || !lng) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.setState(
            { lat: pos.coords.latitude, lng: pos.coords.longitude },
            this.getAddressFromLocation
          );
        },
        () => this.getAddressFromLocation()
      );
    } else {
      this.getAddressFromLocation();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth0;
    const {
      lat,
      lng,
      city,
      results,
      isLoading,
      selectedLat,
      selectedLng,
      isAndroid,
      isIos,
      toast,
    } = this.state;
    const result_list =
      results && results.length !== 0
        ? results.map(
            (
              { facility_type, formatted_address, geometry: { location } },
              index
            ) => {
              return (
                <div
                  className="location"
                  key={index}
                  onClick={() =>
                    this.setNewLocation(location.lat, location.lng)
                  }
                >
                  <h2>
                    {facility_type}{" "}
                    <span>
                      {this.generateDistance(
                        lat,
                        lng,
                        location.lat,
                        location.lng,
                        "K"
                      )}{" "}
                      Km
                    </span>
                  </h2>
                  <address>
                    <i className="fas fa-map-marker-alt" />
                    {formatted_address}
                  </address>

                  <button
                    type="button"
                    onClick={() =>
                      this.redirectToUber(
                        formatted_address,
                        location.lat,
                        location.lng
                      )
                    }
                    className="uberBtn"
                  >
                    {!(isAndroid || isIos) && (
                      <span className="tooltipText">
                        This feature is available in Android and iOS devices
                      </span>
                    )}
                    Ride with Uber
                  </button>
                  <a
                    className="btn btn-outline-primary"
                    href={buildGoogleMapsLink({ origin: { lat, lng }, destination: { lat: location.lat, lng: location.lng } })}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </div>
              );
            }
          )
        : [];
    return (
      <>
        <MetaTags>
          <title>Healthcare facilities near {city}</title>
          <meta
            name="description"
            content="Healthcare facilities near {city}"
          />
          <meta name="keywords" content="Healthcare facilities near {city}" />
        </MetaTags>
        <div id="search">
          {!isLoading && (
            <div className="search-in">
              <div className="results">
                <div className="header">
                  <h2>Search Results for {city}</h2>
                </div>
                <div className="content">
                  {isLoading ? (
                    <SkeletonList />
                  ) : results && results.length !== 0 ? (
                    result_list
                  ) : (
                    <EmptyState
                      title={`No results found for ${city}`}
                      description={
                        !isAuthenticated ? "Please register a request to enable service in your area" : ""
                      }
                      action={!isAuthenticated ? <Login /> : null}
                    />
                  )}
                </div>
              </div>
              <div className="maparea">
                <Map
                  googleMapURL={googleMapURL}
                  loadingElement={
                    <div style={{ width: "100%", height: "100%" }} />
                  }
                  myPlaces={[
                    { id: "1", pos: { lat, lng } },
                    {
                      id: "2",
                      pos: { lat: selectedLat || lat, lng: selectedLng || lng },
                    },
                  ]}
                  containerElement={<div style={{ width: "100%", height: "100%" }} />}
                  mapElement={<div style={{ width: "100%", height: "100%" }} />}
                />
                <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 8 }}>
                  <SOSButton lat={lat} lng={lng} />
                  <a
                    className="btn btn-primary"
                    href={buildGoogleMapsLink({ origin: { lat, lng }, destination: { lat: lat + 0.01, lng: lng + 0.01 } })}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Test Open in Maps
                  </a>
                </div>
              </div>
            </div>
          )}
          {toast ? (
            <Toast
              kind={toast.kind}
              message={toast.message}
              onRetry={toast.retry}
              onClose={() => this.setState({ toast: null })}
            />
          ) : null}
        </div>
      </>
    );
  }
}
export default compose(withAuth0, MaindHOC)(Search);
