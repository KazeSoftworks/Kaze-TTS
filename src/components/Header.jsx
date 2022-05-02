import React from 'react';
import KazeSymbol from '../assets/KazeSymbol.svg';
import '../scss/Header.scss';

const Header = () => {
	return (
		<div className="header">
			<img className="header__logo" src={KazeSymbol} alt="Kaze Logo" />
			<h1>Kaze-TTS</h1>
		</div>
	);
};

export default Header;
