import React, { useState, useEffect } from 'react';
import {
	withGoogleMap,
	withScriptjs,
	GoogleMap,
	DirectionsRenderer,
} from 'react-google-maps';

/**
 * The Map Component.
 *
 * @class Map
 * @extends React.Component
 * @param {Array<{string,Object}>} myPlaces
 */
const Map = ({ myPlaces }) => {
	/** @type {[boolean,Function]} loading*/
	const [isLoading, setIsLoading] = useState(true);

	/** @type {[Object,Function]} direction*/
	const [directions, setDirections] = useState(null);

	/**
	 * A react hook method called when myPlaces props changes value.
	 * Fetches direction from current location to destination on google map.
	 */
	useEffect(() => {
		setIsLoading(true);
		getDirection(myPlaces);
	}, [myPlaces]);

	/**
	 * Set direction from source and destination
	 * @param {Array<{string,Object}>} myPlaces - Source and Destination positions.
	 */
	const getDirection = (myPlaces) => {
		const directionsService = new window.google.maps.DirectionsService();
		const origin = myPlaces[0].pos;
		const destination = myPlaces[1].pos;
		directionsService.route(
			{
				origin: origin,
				destination: destination,
				travelMode: window.google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === window.google.maps.DirectionsStatus.OK) {
					setDirections(result);
					setIsLoading(false);
				} else if (process.env.NODE_ENV === 'development') {
					//show alert in dev mode
						alert(`error fetching directions ${result}`);
				}
			},
		);
	};

	const GoogleMapExample = withGoogleMap((props) => (
		<GoogleMap defaultCenter={myPlaces[0].pos} defaultZoom={13}>
			<DirectionsRenderer directions={directions} />
		</GoogleMap>
	));

	return (
		<>
			{isLoading && <div id="cover"></div>}
			{!isLoading && (
				<GoogleMapExample
					containerElement={<div style={{ height: `600px`, width: '100%' }} />}
					mapElement={<div style={{ height: `600px` }} />}
				/>
			)}
		</>
	);
};

export default withScriptjs(Map);
