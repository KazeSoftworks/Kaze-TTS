import React from 'react';
import '@scss/Settings.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { PATH_SETTINGS, PATH_SETTINGS_FILTER } from '@utils/constants';
import SettingContainer from '@container/SettingContainer';

const Settings = () => {
	return (
		<div className="settings">
			<nav>
				<ul>
					<li>
						<NavLink to={PATH_SETTINGS} end>
							Voice
						</NavLink>
					</li>
					<li>
						<NavLink to={PATH_SETTINGS_FILTER}>Filter</NavLink>
					</li>
				</ul>
			</nav>
			<SettingContainer>
				<Outlet />
			</SettingContainer>
		</div>
	);
};

export default Settings;
