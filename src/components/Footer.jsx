import {
	faRightFromBracket,
	faUser,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import '@scss/Footer.scss';

const Footer = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { displayName, followers } = useSelector((state) => state.twitch);

	return (
		<footer className="footer">
			{!isAuthenticated && (
				<div>
					<FontAwesomeIcon icon={faRightFromBracket} />{' '}
					<span>Please login</span>
				</div>
			)}
			{isAuthenticated && displayName && (
				<div>
					<FontAwesomeIcon icon={faUser} /> <span>{displayName}</span>
				</div>
			)}
			{isAuthenticated && followers && (
				<div>
					<FontAwesomeIcon icon={faUsers} /> <span>{followers}</span>
				</div>
			)}
		</footer>
	);
};

export default Footer;
