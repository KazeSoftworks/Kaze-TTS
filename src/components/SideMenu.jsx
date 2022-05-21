import React from 'react';
import '@scss/SideMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const SideMenu = () => {
	return (
		<div className="side-menu">
			<button type="button" className="side-menu__settings-button">
				<FontAwesomeIcon icon={faGear} /> Settings
			</button>
		</div>
	);
};

export default SideMenu;
