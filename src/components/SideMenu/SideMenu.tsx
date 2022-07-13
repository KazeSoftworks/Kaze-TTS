import React from 'react';
import '@scss/SideMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCommentDots,
	faGear,
	faPlay,
	faStop,
} from '@fortawesome/free-solid-svg-icons';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_SETTINGS } from '@utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setAudioEnabled } from '@features/settingsSlice';
import Chatters from './Chatters';
import { useAppSelector } from 'hooks/reduxHooks';

const SideMenu = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const audioEnabled = useAppSelector((state) => state.settings.audioEnabled);

	const handleOptions = (pathname: Location['pathname']) => {
		switch (pathname) {
			case PATH_HOME:
				navigate(PATH_SETTINGS);
				break;
			default:
				navigate(PATH_HOME);
				break;
		}
	};

	const handleAudioEngine = () => {
		dispatch(setAudioEnabled(!audioEnabled));
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
			<button
				type="button"
				className="side-menu__settings-button"
				onClick={handleAudioEngine}
			>
				{audioEnabled ? (
					<>
						<FontAwesomeIcon icon={faStop} /> Stop Audio
					</>
				) : (
					<>
						<FontAwesomeIcon icon={faPlay} /> Start Audio
					</>
				)}
			</button>
			<Chatters />
		</div>
	);
};

export default SideMenu;
