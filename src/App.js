import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Search from './containers/Search';
import {
	COOKIEBOT_CONSENT_HEAD,
	COOKIEBOT_CONSENT_HEAD_DATA_CBID,
	TAWKTO,
} from './constants/index';

function App() {
	useEffect(() => {
		//import tawk script

		/*jshint esnext: true */
		((/** @type {Object} */ Tawk_API) => {
			Tawk_API = Tawk_API || {};
			const Tawk_LoadStart = new Date();
			const fragmentTawk = document.createDocumentFragment();
			const scriptTawk = document.createElement('script');
			scriptTawk.async = true;
			scriptTawk.src = TAWKTO;
			scriptTawk.charset = 'UTF-8';
			scriptTawk.setAttribute('crossorigin', '*');
			fragmentTawk.appendChild(scriptTawk);
			const firstScript = document.querySelector('script');

			document.head.insertBefore(fragmentTawk, firstScript);
		})();

		//import cookiebot script
		const fragment = document.createDocumentFragment();
		const script = document.createElement('script');
		script.src = COOKIEBOT_CONSENT_HEAD;
		script.async = true;
		script.setAttribute('data-cbid', COOKIEBOT_CONSENT_HEAD_DATA_CBID);
		fragment.appendChild(script);
		document
			.querySelector('head')
			.insertBefore(fragment, document.head.firstChild);
	}, []);
	return (
		<>
			<Router>
			<Switch>
          		<Route exact path="/" component={Home} />
          		<Route path="/search/:lat/:lng" component={Search} />
        	</Switch>
			</Router>
		</>
	);
}
export default App;
