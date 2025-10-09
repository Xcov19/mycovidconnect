import React, { useState, useEffect } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps";

/**
 * The Map Component.
 *
 * @class Map
 * @extends React.Component
 * @param {Array<{string,Object}>} myPlaces
 */
const Map = ({ myPlaces }) => {
  /** @type {[boolean,Function]} loading */
  const [isLoading, setIsLoading] = useState(true);

  // Directions disabled to avoid paid API usage

  /**
   * A react hook method called when myPlaces props changes value.
   * Fetches direction from current location to destination on google map.
   */
  useEffect(() => {
    setIsLoading(true);
    // Guard: require two points and Google Maps runtime
    const hasTwoPoints =
      Array.isArray(myPlaces) &&
      myPlaces.length >= 2 &&
      myPlaces[0] &&
      myPlaces[0].pos &&
      myPlaces[1] &&
      myPlaces[1].pos;
    if (!hasTwoPoints) {
      setIsLoading(false);
      return;
    }
    if (!window.google || !window.google.maps) {
      setIsLoading(false);
      return;
    }
    // Skip Directions API to avoid billing; just show base map
    setIsLoading(false);
  }, [myPlaces]);

  /**
   * Set direction from source and destination
   * @param {Array<{string,Object}>} myPlaces - Source and Destination positions.
   */
  // Directions removed

  const fallbackCenter = (myPlaces && myPlaces[0] && myPlaces[0].pos) || {
    lat: 12.9716,
    lng: 77.5946,
  };

  const GoogleMapExample = withGoogleMap((props) => (
    <GoogleMap defaultCenter={fallbackCenter} defaultZoom={13}>
      {myPlaces && myPlaces[0] && myPlaces[0].pos ? (
        <Marker position={myPlaces[0].pos} />
      ) : null}
      {myPlaces && myPlaces[1] && myPlaces[1].pos ? (
        <Marker position={myPlaces[1].pos} />
      ) : null}
    </GoogleMap>
  ));

  return (
    <>
      {isLoading && <div id="cover" />}
      {!isLoading && (
        <GoogleMapExample
          containerElement={<div style={{ height: "600px", width: "100%" }} />}
          mapElement={<div style={{ height: "600px" }} />}
        />
      )}
    </>
  );
};

export default withScriptjs(Map);
