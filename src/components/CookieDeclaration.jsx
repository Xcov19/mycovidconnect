import React, { useEffect } from 'react';

import { COOKIEBOT_CONSENT_DECLARATION } from '../constants';
const CookieDeclaration = ({ show, handleclose }) => {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = COOKIEBOT_CONSENT_DECLARATION;
		script.async = true;
			document.getElementById('cookieData').appendChild(script);
	}, []);

	return (
		<div
			style={{
				width: show ? '550px' : '0px',
				height: show ? '450px' : '0px',
				padding: show ? '20px' : '0px',
				left: '0',
				top: '0',
				bottom: '0',
				right: '0',
				margin: 'auto',
				position: 'absolute',
				backgroundColor: 'white',
				overflow: 'auto',
				zIndex: '1'
			}}
			id="cookieData"
		>
			<button className="cookie-close" onClick={handleclose}>
				X
			</button>
			<div className="cookie-title">
				<img src="/cookie-icon96.png" alt="cookie-icon" />
				<h3>Cookies & Privacy Policy</h3>
			</div>
		</div>
	);
};

export default CookieDeclaration;
