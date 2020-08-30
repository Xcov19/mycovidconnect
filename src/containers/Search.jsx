import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import MaindHOC from "../components/MainHOC";
import FireStore from "../firebase/fireStore";
import MyMapComponent from "../components/MyMapComponent";
import { GOOGLE_MAPS_API_KEY } from "../constants";

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
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const main_pint = data.results[0];
        const city =
          main_pint.address_components &&
          main_pint.address_components[1] &&
          main_pint.address_components[1].long_name &&
          main_pint.address_components[1].long_name !== ""
            ? main_pint.address_components[1].long_name
            : "";
        this.setState(
          {
            city,
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
    const { city } = this.state;
    FireStore.firebaseInit();
    FireStore.fetchCityData("bangalore", this.setResults);
  };

  setNewLocation = (lat, lng) => {
    this.setState({
      selectedLat: lat,
      selectedLng: lng,
    });
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
                  <h2>{facility_type}</h2>
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
          {results === {} && !isLoading && (
            <div className="noresults">
              <div className="icon"></div>
              <div className="text">
                <h2>No results found</h2>
              </div>
            </div>
          )}
          {results !== {} && !isLoading && (
            <div className="search-in">
              <div className="results">
                <div className="header">
                  <h2>Search Results for {city}</h2>
                </div>
                <div className="content">{result_list}</div>
              </div>
              <div className="maparea">
                <MyMapComponent
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
