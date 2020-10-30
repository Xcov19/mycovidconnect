import React, { useEffect } from 'react';

const CookieDeclaration = ({ show, handleclose }) => {
	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js';
		script.async = true;
		document.getElementById('cookieData').appendChild(script);
	}, []);

	return (
		<div
			style={{
				width: '550px',
				height: '450px',
				left: '0',
				top: '0',
				bottom: '0',
				right: '0',
				margin: 'auto',
				position: 'absolute',
				backgroundColor: 'white',
				overflow: 'auto',
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
