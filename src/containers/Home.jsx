import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import { Redirect } from 'react-router-dom';
import MaindHOC from '../components/MainHOC';
import ResponsiveComponents from '../components/responsiveness/ResponsiveComponents';
import Taxi from '../components/responsiveness/svg-components/Taxi';
import Ward from '../components/responsiveness/svg-components/Ward';
import Sick from '../components/responsiveness/svg-components/Sick';
import Form from '../components/responsiveness/svg-components/Form';



class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 0,
			lng: 0,
			redirect: false,
		};
	}

	responsive1 = () => {
		var x = document.getElementById("t1");
		if (x.style.display === "none") {
		  x.style.display = "block";
		} else {
		  x.style.display = "none";
		}
	  }

	responsive2 = () => {
		var x = document.getElementById("t2");
		if (x.style.display === "none") {
		x.style.display = "block";
		} else {
		x.style.display = "none";
		}
	}

	responsive3 = () => {
		var x = document.getElementById("t3");
		if (x.style.display === "none") {
		x.style.display = "block";
		} else {
		x.style.display = "none";
		}
	}

	responsive4 = () => {
		var x = document.getElementById("t4");
		if (x.style.display === "none") {
		x.style.display = "block";
		} else {
		x.style.display = "none";
		}
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
						<h1>Save Precious Time</h1>
						<p>
							With real-time updates, MyCOVIDConnect links you to the nearest
							healthcare provider for testing and pre-admission
						</p>
						<button onClick={this.getLocation}>
							<h2>SOS</h2>
							<p>
								Find Hospitals <br /> Near Me
							</p>
						</button>
					</div>
				</div>
				<div id="Work">
					<span>How It Works</span>
				</div>
				<div id="responsive-component">
					<div id="Sick">
						<Sick/>
						<p>XCOV19 helps ill patients find hospitals and assess symptom</p>
						<span onClick={this.responsive1}><i class="arrow down"></i></span>
					</div>
					<div id='t1'>
						<p>
						As of July 13, India’s total for coronavirus Cases topped 878,000, including 23,000 deaths.
						</p>
					</div>
					
					<div id="Form">
						<Form />
						<p>XCOV19 requests patient data and completes pre-assessment in tandem with the HMS</p>
						<span onClick={this.responsive2}><i class="arrow down"></i></span>
					</div>
					<div id='t2'>
						<p>
						4,300 Indians die every day due to lack of access to poor quality of healthcare.
						</p>
					</div>
					<div id ="Taxi">
						<Taxi />
						<p>Patient arrives at Hospital</p>
						<span onClick={this.responsive3}><i class="arrow down"></i></span>
					</div>
					<div></div>
					<div id='t3'>
						<p>
							Government spending on healthcare falls below ₹2,000 per person, 
							highlighting a need for technology efficiency and lean process
						</p>
					</div>
					<div id="Ward">
						<Ward />
						<p>Hospital admits patient in hasle-free process</p>
						<span onClick={this.responsive4} class='arr'><i class="arrow down"></i></span>
					</div>
					<div id='t4'>
						<p>
						In Mumbai, 99% of intensive care beds were full in July. 
						Delhi needs 10 times the current available amount of expected cases.
						</p>
					</div>
				</div>
			</>
		);
	}
}

export default MaindHOC(Home);
