import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import MaindHOC from '../components/MainHOC';
import Map from '../components/Map';
import { withAuth0 } from '@auth0/auth0-react';
import { compose } from 'recompose'


import {
	GOOGLE_MAPS_API_KEY,
	UBER_CLIENT_ID,
	alternativeCityNamesLookup,
	ESP_PROXY_DOMAIN,
	ESP_PROXY_PORT
} from '../constants';
import LoginButton from '../components/LoginButton';

const MAP_API = `${GOOGLE_MAPS_API_KEY}`.match(/[A-Za-z0-9_]+/i)[0];
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${MAP_API}`;

/**
 * The Nearby Component.
 *
 * @class Nearby
 * @extends React.Component
 */
export class Nearby extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: (this.props && this.props.match) ? parseFloat(this.props.match.params.lat) : 0,
			lng: (this.props && this.props.match) ? parseFloat(this.props.match.params.lng) : 0,
			selectedLat: 0,
			selectedLng: 0,
			city: '',
			pickupAddress: '',
			results: [],
			isLoading: true,
			isAndroid: /Android/i.test(navigator.userAgent),
			isIos: /iPhone|iPod|iPad/.test(navigator.platform),
            allStates: []
		};
	}

	/**
	 * Find and update city name from current latitude and longitude
	 * @fires Search#getAddressFromLocation
	 */
	getAddressFromLocation = () => {
		const { lat, lng } = this.state;
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${MAP_API}`,
		)
			.then((response) => response.json())
			.then((data) => {
				const main_pint = data.results[0];
				const locality = (main_pint?.address_components || [])?.filter((x) =>
					x.types?.includes("locality"),
				);
				const city = locality[0]?.long_name || '';
                // get postal code
                const postalLoc = (main_pint?.address_components || [])?.filter((x) =>
					x.types?.includes("postal_code"),
				);

				const postal_code = postalLoc[0]?.long_name || '';

				/**
				 *  Callback function passed
				 * @callback CallBack
				 */
				/** Set current city name.
				 * @event Search#getAddressFromLocation
				 * @type {updater}
				 * @property {city} state.city
				 * @property {CallBack} getVaccineSessionsByPin
				 */
				this.setState(
					{
						city: city.toLowerCase(),
						pickupAddress: main_pint?.formatted_address || '',
					},
					() => this.getVaccineSessionsByPin(postal_code)
				);
			}).catch(console.error);
	};

    /**
	 * Function to fech nearby vaccine centers based on pincode
	 *  @param { string } pincode - User's pincode
	 */
	getVaccineSessionsByPin = (pincode) => {

		console.log("getting vaccine centers by pincode")
		const datestring = new Date().toLocaleDateString('en-GB', {
			day: 'numeric', month: 'numeric', year: 'numeric'
		  }).replace(/\//g, '-');

        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${datestring}`)
        .then(response => response.json())
        .then(data=>{
			this.findVaccineCentersByLatLong(data['sessions']);
        }).catch(console.error)
    }

	/**
	 * Filter vaccine centers based on distance
	 *  @param {Array<{string,Object}>} results - Center results fron findByPin API
	 *  @param {String} distance - Distance from search param in url
	 */
	filterResultsByDistance = (results, distance) => {
		let vaccineCenters = results.filter((res)=>{
			const calcDistance = Number(this.generateDistance(this.state.lat, this.state.lng, res['lat'], res['long'], 'K'));
			if(calcDistance <= distance){
				res["distance"] =  calcDistance
				return res;
			}
		})
		return vaccineCenters;
	}
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
			selectedLat: (results[0] || {}).lat,
			selectedLng: (results[0] || {}).long,
			isLoading: false,
		});
	};

	/**
	 * Set Latitude and Logitude of selected hospital
	 *
	 * @fires Search#setNewLocation
	 * @param {number} lat - Latitude of the city.
	 * @param {number} lng - Longitude of the city.
	 */

	setNewLocation = (lat, lng) => {
		/**
		 * Set Latitude and Logitude of selected hospital
		 * @event setNewLocation
		 * @type {updater}
		 * @property {selectedLat} state.selectedLat
		 * @property {selectedLng} state.selectedLng
		 */
		this.setState({
			selectedLat: lat,
			selectedLng: lng,
		});
	};

	/**
	 * Find distance between current location and selected hospital
   
	 * @param {number} lat1 - Latitude of the source location.
	 * @param {number} lng1 - Longitude of the source location.  
	 * @param {number} lat2 - Latitude of the destination location.
	 * @param {number} lng2 - Longitude of the destination location.  
   	 * @param {string} unit - required unit of distance in kilometers('K') or nautical miles('N').
     * @return {number} The distance between two co-ordinates
	*/
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
			if (unit === 'K') {
				dist = dist * 1.609344;
			}
			if (unit === 'N') {
				dist = dist * 0.8684;
			}
			return dist.toFixed(2);
		}
	};

	/**
	 * Deeplink to Uber app or store based on app installation status
   
	 * @param {string} address - address of the selected location.
	 * @param {number} lat - Latitude of the selected location.
	 * @param {number} lng - Longitude of the selected location.
	*/
	redirectToUber = (dropOffAddress, dropoffLat, dropOffLng) => {
		const { isAndroid, isIos, pickupAddress, lat, lng } = this.state;

		if (isAndroid) {
			window.location = `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=${lat}&pickup[longitude]=${lng}&pickup[formatted_address]=${encodeURI(
				pickupAddress,
			)}&client_id=${UBER_CLIENT_ID}&dropoff[formatted_address]=${encodeURI(
				dropOffAddress,
			)}&dropoff[latitude]=${dropoffLat}&dropoff[longitude]=${dropOffLng}`;
		} else if (isIos) {
			//redirect to app store if uber not installed
			setTimeout(function () {
				window.location.href = 'https://apps.apple.com/in/app/uber/id368677368';
			}, 2000);

			window.location = `uber://?action=setPickup&pickup[latitude]=${lat}&pickup[longitude]=${lng}&pickup[formatted_address]=${encodeURI(
				pickupAddress,
			)}&client_id=${UBER_CLIENT_ID}&dropoff[formatted_address]=${encodeURI(
				dropOffAddress,
			)}&dropoff[latitude]=${dropoffLat}&dropoff[longitude]=${dropOffLng}`;
		} else {
			window.open(
				`https://m.uber.com?action=setPickup&pickup[latitude]=${lat}&pickup[longitude]=${lng}&pickup[formatted_address]=${encodeURI(
					pickupAddress,
				)}&client_id=${UBER_CLIENT_ID}&dropoff[formatted_address]=${encodeURI(
					dropOffAddress,
				)}&dropoff[latitude]=${dropoffLat}&dropoff[longitude]=${dropOffLng}`,
				'_blank',
			);
		}
	};

	/**
	 * Find vaccine centers by lat-long
	 * @param  {any} sessionsData - sessions array from findByPin API
	 */
	findVaccineCentersByLatLong(sessionsData){
		const {lat, lng} = this.state;
		fetch(`https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=${lat}&long=${lng}`)
		.then(response => response.json())
        .then(data=>{

			this.filterSessions(sessionsData, data['centers'])		
		
		}).catch(console.error)
	}

	/**
	 * Filters centers based on same center_id to get exact lat-long for the center & distance
	 * @param  {any} sessionsData - sessionsData array from findByPin API
	 * @param  {any} centersByLatLng - centers array from findByLatLong API
	 */
	filterSessions(sessionsData, centersByLatLng){
		
		const filteredCenters = centersByLatLng.filter(cen => {
			if (sessionsData.some(({ center_id }) => cen.center_id === center_id)) {
				cen['lat'] = Number(cen['lat']);
				cen['long'] = Number(cen['long']);
				return cen;
			}
		}
		);
		const distance = (this.props.location && this.props.location.search) ? Number(new URLSearchParams(this.props.location.search).get('distance')) : 100;
		
		const centerDataWithDis = this.filterResultsByDistance(filteredCenters, distance || 100);

		centerDataWithDis.sort(function (a, b) { return parseFloat(a.distance) - parseFloat(b.distance) });

		this.setResults(centerDataWithDis);
	}
	/**
	 * A react lifecycle method called when the component has mounted.
	 * It calls the getStates method right after updating.
	 */
	componentDidMount() {
		this.getAddressFromLocation();
	}

	/**
	 * The render function.
	 */
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
		} = this.state;

		const result_list =
			results && results.length !== 0
				? results.map(
						( vaccineCenter, index) => {
							return (
								<div
									className="location"
									key={index}
									onClick={() => this.setNewLocation(vaccineCenter.lat, vaccineCenter.long)}
								>
									<h2>
										{vaccineCenter?.name}{' '}
										<span>
										{this.generateDistance(lat, lng, vaccineCenter.lat, vaccineCenter.long, 'K')} Km

										</span>
									</h2>
									<address>
										<i className="fas fa-map-marker-alt"></i>
										{vaccineCenter?.address}
									</address>

									<button
										type="button"
										onClick={() =>
											this.redirectToUber(vaccineCenter.address, vaccineCenter.lat, vaccineCenter.long)
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
									{/* TODO(@codecakes): add phone number */}
								</div>
							);
						},
				  )
				: [];
		return (
			<>
				<MetaTags>
					<title>Healthcare facilities near {city}</title>
					<meta name="description" content="Healthcare facilities near {city}" />
					<meta name="keywords" content="Healthcare facilities near {city}" />
				</MetaTags>
				<div id="search">
					{isLoading && <div id="cover"></div>}
					{results && results.length === 0 && !isLoading && (
						<div className="noresults">
							<div className="icon"></div>
							<div className="text">
								<h2>No results found for {city}</h2>
								<br />
								{ !isAuthenticated && (
									<span>
								Please register a request to enable service in your area{" "}
								</span>
								)
								}
							</div>
							{ !isAuthenticated && (
							<div>
								<a href={`https://${ESP_PROXY_DOMAIN}:${ESP_PROXY_PORT}/auth0/login/auth0`}>
								<LoginButton name={'Request'}/>
							</a>
							</div>
							)
							}
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
									googleMapURL={googleMapURL}
									loadingElement={<div style={{ width: `100%`, height: `100%` }} />}
									myPlaces={[
										{ id: '1', pos: { lat, lng } },
										{
											id: '2',
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
export default compose(
	withAuth0,
	MaindHOC
)(Nearby)

