import {
	faRightFromBracket,
	faUser,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '@scss/Footer.scss';
import { useAppSelector } from 'hooks/reduxHooks';

const Footer = () => {
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const displayName = useAppSelector((state) => state.twitch.displayName);
	const followers = useAppSelector((state) => state.twitch.followers);

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
