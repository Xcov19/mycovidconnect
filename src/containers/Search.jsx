import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import MaindHOC from "../components/MainHOC";
import FireStore from "../firebase/fireStore";
import Map from "../components/Map";
import { GOOGLE_MAPS_API_KEY, alternativeCityNamesLookup } from "../constants";

const MAP_API = `${GOOGLE_MAPS_API_KEY}`.match(/[A-Za-z0-9_]+/i)[0];
const googleMapURL=`https://maps.googleapis.com/maps/api/js?key=${MAP_API}`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: parseFloat(this.props.match.params.lat) || 0,
      lng: parseFloat(this.props.match.params.lng) || 0,
      selectedLat: 0,
      selectedLng: 0,
      city: "",
      results: [],
      isLoading: true,
    };
  }

  getAddressFromLocation = () => {
    const { lat, lng } = this.state;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${MAP_API}`)
      .then((response) => response.json())
      .then((data) => {
        const main_pint = data.results[0];
        const city =
          main_pint.address_components &&
            main_pint.address_components[4] &&
            main_pint.address_components[4].long_name &&
            main_pint.address_components[4].long_name !== ""
            ? main_pint.address_components[4].long_name
            : "";
        this.setState(
          {
            city: city.toLowerCase(),
          },
          () => this.getLocationResults()
        );
      });
  };

  setResults = (results) => {
    this.setState({
      results,
      selectedLat:
        results[0] &&
        results[0].geometry &&
        results[0].geometry.location &&
        results[0].geometry.location.lat,
      selectedLng:
        results[0] &&
        results[0].geometry &&
        results[0].geometry.location &&
        results[0].geometry.location.lng,
      isLoading: false,
    });
  };

  getLocationResults = () => {
    let { city } = this.state;
    city = alternativeCityNamesLookup[city] || city;
    FireStore.firebaseInit();
    FireStore.fetchCityData(city, this.setResults);
  };

  setNewLocation = (lat, lng) => {
    this.setState({
      selectedLat: lat,
      selectedLng: lng,
    });
  };

  generateDistance = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist.toFixed(2);
    }
  };

  componentDidMount() {
    this.getAddressFromLocation();
  }

  render() {
    const {
      lat,
      lng,
      city,
      results,
      isLoading,
      selectedLat,
      selectedLng,
    } = this.state;
    const result_list =
      results && results.length !== 0
        ? results
        .sort((a,b) => this.generateDistance(lat,lng,a.geometry.location.lat,a.geometry.location.lng) - this.generateDistance(lat,lng,b.geometry.location.lat,b.geometry.location.lng))
        .map(
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
                  <i className="fas fa-map-marker-alt"></i>
                  {formatted_address}
                </address>
                {/* TODO(@codecakes): add phone number */}
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
          {isLoading && <div id="cover"></div>}
          {results && results.length === 0 && !isLoading && (
            <div className="noresults">
              <div className="icon"></div>
              <div className="text">
                <h2>No results found for {city}</h2>
              </div>
            </div>
          )}
          {results && results.length !== 0 && !isLoading && (
            <div className="search-in">
              <div className="results">
                <div className="header">
                  <h2>Search Results for {city}</h2>
                </div>
                <div className="content">{result_list}</div>
              </div>
              <div className="maparea">
                <Map
                  googleMapURL={ googleMapURL }
                  loadingElement={
                    <div style={{ width: `100%`, height: `100%` }} />
                  }
                  myPlaces={[
                    { id: "1", pos: { lat, lng } },
                    {
                      id: "2",
                      pos: { lat: selectedLat, lng: selectedLng },
                    },
                  ]}
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default MaindHOC(Search);
