import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
const SessionExpiry = () => {
	const defaultTime = 3600;

	const [timeLeft, setTimeLeft] = useState(defaultTime);
	const [isReset, setIsReset] = useState(false);
	const [isDismissed, setIsDismissed] = useState(false);
	const [isPopUp, setIsPopUp] = useState(false);

	const dismiss = () => {
		setIsDismissed(true);
	};

	const displayTime = (timeLeft) => {
		const hh = Math.floor(timeLeft / 60);
		const mm = `${Math.floor(timeLeft % 60)}`.padStart(2, '0');
		return `${hh}:${mm}`;
	};

	const autoLogOut = () => {
		if (timeLeft <= 0) {
			setIsDismissed(true);
			window.localStorage.removeItem('results');
			window.localStorage.removeItem('location');
			window.localStorage.removeItem('lastActiveSession');
		}
	};

	useEffect(autoLogOut);

	useEffect(() => {
		console.log(timeLeft, isDismissed);
		if (timeLeft < 30) {
			setIsPopUp(true);
		}
		const timer = setTimeout(() => {
			if (timeLeft > 0) setTimeLeft(timeLeft - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [timeLeft]);

	useEffect(() => {
		if (!localStorage.getItem('lastActiveSession')) {
			localStorage.setItem('lastActiveSession', new Date());
		} else {
			const today = new Date();
			const lastActiveSession = new Date(
				localStorage.getItem('lastActiveSession'),
			);
			const diffMs = today - lastActiveSession;
			const diffDays = Math.floor(diffMs / 86400000);
			const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
			const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

			if (diffDays > 0 || diffHrs > 1) {
				setTimeLeft(0);
			} else {
				setTimeLeft(defaultTime - diffMins * 60 || defaultTime);
			}
		}
	}, []);
	if (!isDismissed) {
		if (timeLeft <= 0) {
			return <Redirect to="/" />;
		} else if (timeLeft < 30) {
			return (
				<div className="sessionExpiry">
					<div className="topBar">
						<span className="topBarButton" onClick={dismiss}>
							&times;
						</span>
					</div>
					<div className="warning">
						Please note that your session is about to expire in{' '}
						{displayTime(timeLeft)}
					</div>
					<button className="sessionExpiryButton  " onClick={() => setIsReset(true)}>
						Continue session
					</button>
				</div>
			);
		} else {
			return null;
		}
	} else {
		return null;
	}
};

export default SessionExpiry;
