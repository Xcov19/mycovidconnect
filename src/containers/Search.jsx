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
      lat: this.props.match.params.lat || 0,
      lng: this.props.match.params.lng || 0,
      city: "",
      results: {},
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
      selected: 0,
      isLoading: false,
    });
  };

  getLocationResults = () => {
    const { city } = this.state;
    FireStore.firebaseInit();
    FireStore.fetchCityData(city, this.setResults);
  };

  componentDidMount() {
    this.getAddressFromLocation();
  }

  render() {
    const { lat, lng, city, results, isLoading } = this.state;
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
                <div className="content">
                  <div className="location">
                    <h2>Hospital Name</h2>
                    <address>
                      <i className="fas fa-map-marker-alt"></i>hospital address
                    </address>
                    <p>
                      <i className="fas fa-phone"></i>hospital address
                    </p>
                  </div>

                  <div className="location">
                    <h2>Hospital Name</h2>
                    <address>
                      <i className="fas fa-map-marker-alt"></i>hospital address
                    </address>
                    <p>
                      <i className="fas fa-phone"></i>hospital address
                    </p>
                  </div>

                  <div className="location">
                    <h2>Hospital Name</h2>
                    <address>
                      <i className="fas fa-map-marker-alt"></i>hospital address
                    </address>
                    <p>
                      <i className="fas fa-phone"></i>hospital address
                    </p>
                  </div>

                  <div className="location">
                    <h2>Hospital Name</h2>
                    <address>
                      <i className="fas fa-map-marker-alt"></i>hospital address
                    </address>
                    <p>
                      <i className="fas fa-phone"></i>hospital address
                    </p>
                  </div>

                  <div className="location">
                    <h2>Hospital Name</h2>
                    <address>
                      <i className="fas fa-map-marker-alt"></i>hospital address
                    </address>
                    <p>
                      <i className="fas fa-phone"></i>hospital address
                    </p>
                  </div>
                </div>
              </div>
              <div className="maparea">
                <MyMapComponent
                  initialCenter={{
                    lat,
                    lng,
                  }}
                  myPlaces={[
                    { id: "1", pos: { lat, lng } },
                    { id: "2", pos: { lat: 39.10366509575983, lng: -94.48751660204751 } },
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
