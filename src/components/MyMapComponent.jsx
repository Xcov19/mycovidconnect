import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { GOOGLE_MAPS_API_KEY } from "../constants";

export class MapContainer extends Component {
  render() {
    const { myPlaces, initialCenter } = this.props;
    return (
      <Map
        google={this.props.google}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        initialCenter={initialCenter}
        className={"map"}
        zoom={14}
      >
        <Marker
          name={"Your Here"}
          position={myPlaces[0].pos}
          icon={{
            url:
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
            anchor: new window.google.maps.Point(50, 50),
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
        <Marker
          name={"Hospital"}
          position={myPlaces[1].pos}
          icon={{
            url:
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png",
            anchor: new window.google.maps.Point(50, 50),
            scaledSize: new window.google.maps.Size(50, 50),
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAPS_API_KEY,
})(MapContainer);
