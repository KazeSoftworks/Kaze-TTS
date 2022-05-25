import React from 'react';
import '@scss/SideMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import Chatters from './Chatters';

const SideMenu = () => {
	const location = useLocation();

	const handleOptions = () => {
		console.log(location);
	};

	return (
		<div className="side-menu">
			<button
				type="button"
				className="side-menu__settings-button"
				onClick={handleOptions}
			>
				<FontAwesomeIcon icon={faGear} /> Settings
			</button>
			<Chatters />
		</div>
	);
};

export default SideMenu;
