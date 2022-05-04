import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { AUTH_URI } from '../utils/constants';
import KazeSymbol from '../assets/KazeSymbol.svg';
import '../scss/Header.scss';

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
					<FontAwesomeIcon icon={faTwitch} /> LOGIN
				</button>
				<FontAwesomeIcon className="header__account_logo" icon={faCircleUser} />
			</div>
		</div>
	);
};

export default Header;
