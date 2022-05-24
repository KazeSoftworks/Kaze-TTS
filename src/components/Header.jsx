import React from 'react';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleUser,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_URI } from '@utils/constants';
import KazeSymbol from '@assets/KazeSymbol.svg';
import '@scss/Header.scss';
import { revokeToken } from '@features/authSlice';
import Button from '@components/Button';

const Header = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, isLoadingValidate, isLoadingRevoke } = useSelector(
		(state) => state.auth
	);
	const profileImageUrl = useSelector((state) => state.twitch.profileImageUrl);

	const handleLogin = () => {
		window.location.href = AUTH_URI;
	};

	const handleSignout = () => {
		dispatch(revokeToken());
	};

	return (
		<div className="header">
			<div className="header__left">
				<img className="header__logo" src={KazeSymbol} alt="Kaze Logo" />
				<h1>Kaze-TTS</h1>
			</div>
			<div className="header__right">
				<Button
					onClick={isAuthenticated ? handleSignout : handleLogin}
					startIcon={isAuthenticated ? faRightFromBracket : faTwitch}
					className={isAuthenticated ? 'button-signout' : 'button-twitch'}
					isLoading={isLoadingValidate || isLoadingRevoke}
				>
					{isAuthenticated ? 'Disconnect' : 'Login'}
				</Button>
				{isAuthenticated && profileImageUrl ? (
					<img
						className="header__account_logo"
						src={profileImageUrl}
						alt="Twitch Profile"
						loading="lazy"
					/>
				) : (
					<FontAwesomeIcon
						className="header__account_logo"
						icon={faCircleUser}
					/>
				)}
			</div>
		</div>
	);
};

export default Header;
