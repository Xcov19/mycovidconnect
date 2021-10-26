import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import MaindHOC from '../components/MainHOC';
import SearchRoute from '../components/SearchRoute';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
	
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
						<SearchRoute navigateTo={"search"}>
							<button>
								<h2>SOS</h2>
								<p>
									Find Hospitals <br /> Near Me
								</p>
								</button>
				    	</SearchRoute>
					</div>
				</div>
			</>
		);
	}
}

export default MaindHOC(Home);
