import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      directions: null,
    };
  }

  componentDidMount() {
    const directionsService = new window.google.maps.DirectionsService();
    const origin = this.props.myPlaces[0].pos;
    const destination = this.props.myPlaces[1].pos;
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            isLoading: false,
            directions: result,
          });
        } else {
          alert(`error fetching directions ${result}`);
        }
      }
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: true });
    const directionsService = new window.google.maps.DirectionsService();
    const origin = nextProps.myPlaces[0].pos;
    const destination = nextProps.myPlaces[1].pos;
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
            isLoading: false,
          });
        } else {
          alert(`error fetching directions ${result}`);
        }
      }
    );
  }

  render() {
    const { isLoading } = this.state;
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap defaultCenter={this.props.myPlaces[0].pos} defaultZoom={13}>
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <>
        {isLoading && <div id="cover"></div>}
        {!isLoading && (
          <GoogleMapExample
            containerElement={
              <div style={{ height: `600px`, width: "100%" }} />
            }
            mapElement={<div style={{ height: `600px` }} />}
          />
        )}
      </>
    );
  }
}

export default withScriptjs(Map);
