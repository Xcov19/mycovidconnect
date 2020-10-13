import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import { Redirect } from 'react-router-dom';
import MaindHOC from '../components/MainHOC';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 0,
			lng: 0,
			redirect: false,
		};
	}

	getLocation = () => {
		if (window.navigator && window.navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let lat = position.coords.latitude;
					let lng = position.coords.longitude;
					this.setState({
						lat: lat,
						lng: lng,
						redirect: true,
					});
				},
				(error) => {
					alert('Error dectecting your location');
				},
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
			);
		} else {
			alert('Please allow Geo Location permissions to access this facility');
		}
	};

	render() {
		const { redirect, lat, lng } = this.state;
		if (redirect) {
			return <Redirect to={`/search/${lat}/${lng}`} />;
		}
		return (
			<>
				<MetaTags>
					<title>MyCovidConnect: Find Nearest Healthcare facility</title>
					<meta
						name="description"
						content="MyCovidConnect: Find Nearest Healthcare facility"
					/>
					<meta
						name="keywords"
						content="MyCovidConnect: Find Nearest Healthcare facility"
					/>
				</MetaTags>
				<div id="banner">
					<div className="banner-in">
						<h1>Big Title</h1>
						<p>
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
							officia deserunt
						</p>
						<button onClick={this.getLocation}>
							<h2>SOS</h2>
							<p>
								Find Hospitals <br /> Near Me
							</p>
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default MaindHOC(Home);
