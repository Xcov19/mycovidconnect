import React, { useState } from 'react';
import CookieDeclaration from '../components/CookieDeclaration';
import { Link } from 'react-router-dom';
const Footer = () => {
	const [show, setShow] = useState(false);

	const showModal = (e) => {
		e.preventDefault();
		setShow(true);
	};

	const hidemodal = () => {
		setShow(false);
	};
	
	return (
		<>
			<footer>
				<div className="footerin">
					<div className="w40">
						<h3>Join Our Community</h3>
						<a
							target="_blank"
							rel="noreferrer noopener"
							href="https://forum.mycovidconnect.com/"
							title="Join Now"
						>
							<button>Join Now</button>
						</a>
					</div>
					<div className="w30">
						<div className="links">
							<a
								target="_blank"
								rel="noreferrer noopener"
								href="https://forum.mycovidconnect.com/d/2-about-xcov19-rapid-action-patient-dispatch-solution"
							>
								About XCOV19
							</a>
							<Link to="/contact"
								href="mailto:reachout@mycovidconnect.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								Contact Us
							</Link>
							<a rel="noreferrer" href="# " onClick={showModal}>
								Privacy Policy
							</a>
						</div>
						<div className="media-links">
							<div className="first-row">
								<a href="https://hacktoberfest.cloud.mattermost.com/main/channels/mlh-4616">
									<img
										src={
											'https://d2vgampz89jm7o.cloudfront.net/_Sponsors+Light+Boxed+2.svg'
										}
										alt="hacktoberfest-sponsors-logo"
									/>
								</a>
								<a href="https://app.mattermore.io/matters/TWF0dGVyOjky/xcov19-rapid-action-patient-dispatch-solution-for-covid-19">
									<img
										src={'https://d2vgampz89jm7o.cloudfront.net/mattermore_logo.jpeg'}
										alt="mattermore-logo"
										id="square"
									/>
								</a>
							</div>
							<div className="second-row">
								<a href="https://helpful.directory/projects/HE-1594886592000">
									<img
										src={
											'https://d2vgampz89jm7o.cloudfront.net/helpful-engineering-logo-1.png'
										}
										alt="helpful-logo"
									/>
								</a>
								<a href="https://app.jogl.io/project/251/about">
									<img
										src={'https://d2vgampz89jm7o.cloudfront.net/JOGL_logo.png'}
										alt="jogl-logo"
										id="square"
									/>
								</a>
							</div>
							<div className="third-row">
								<a href="https://simpleanalytics.com/mycovidconnect.com?utm_source=mycovidconnect.com&utm_content=badge" referrerpolicy="origin" target="_blank">
									<img 
										src={'https://simpleanalyticsbadge.com/mycovidconnect.com'}
										alt="analytics-logo"
										loading="lazy" 
										referrerpolicy="no-referrer" 
										crossorigin="anonymous" 
									/>
								</a>
							</div>
							<CookieDeclaration show={show} handleclose={hidemodal} />
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
