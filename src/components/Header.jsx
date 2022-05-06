import React from 'react';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { AUTH_URI } from '../utils/constants';
import KazeSymbol from '../assets/KazeSymbol.svg';
import '../scss/Header.scss';
import Button from './Button';

const Header = () => {
	const handleLogin = () => {
		window.location.href = AUTH_URI;
	};
	return (
		<div className="header">
			<div className="header__left">
				<img className="header__logo" src={KazeSymbol} alt="Kaze Logo" />
				<h1>Kaze-TTS</h1>
			</div>
			<div className="header__right">
				<Button
					onClick={handleLogin}
					startIcon={faTwitch}
					className="button-twitch"
				>
					Login
				</Button>
				<FontAwesomeIcon className="header__account_logo" icon={faCircleUser} />
			</div>
		</div>
	);
};

export default Header;
