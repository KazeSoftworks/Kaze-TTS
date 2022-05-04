import React from 'react';
import KazeSymbol from '../assets/KazeSymbol.svg';
import '../scss/Header.scss';
import { AUTH_URI } from '../utils/constants';
import TwitchLogo from '../assets/TwitchGlitchWhite.svg';

const Header = () => {
	return (
		<div className="header">
			<div className="header__left">
				<img className="header__logo" src={KazeSymbol} alt="Kaze Logo" />
				<h1>Kaze-TTS</h1>
			</div>
			<div className="header__right">
				<button
					type="button"
					className="header__login-button"
					onClick={() => window.open(AUTH_URI, '_self')}
				>
					<img src={TwitchLogo} alt="Twitch logo" /> LOGIN
				</button>
			</div>
		</div>
	);
};

export default Header;
