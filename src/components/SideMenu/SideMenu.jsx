import React from 'react';
import '@scss/SideMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faGear } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_SETTINGS } from '@utils/constants';
import Chatters from './Chatters';

const SideMenu = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleOptions = (pathname) => {
		switch (pathname) {
			case PATH_SETTINGS:
				navigate(PATH_HOME);
				break;
			default:
				navigate(PATH_SETTINGS);
				break;
		}
	};

	return (
		<div className="side-menu">
			<button
				type="button"
				className="side-menu__settings-button"
				onClick={() => handleOptions(location.pathname)}
			>
				{location.pathname === PATH_HOME ? (
					<>
						<FontAwesomeIcon icon={faGear} /> Settings
					</>
				) : (
					<>
						<FontAwesomeIcon icon={faCommentDots} /> Chat
					</>
				)}
			</button>
			<Chatters />
		</div>
	);
};

export default SideMenu;
