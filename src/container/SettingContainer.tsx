import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import '@scss/SettingContainer.scss';

const SettingContainer = ({ children }: { children: ReactNode }) => {
	return <div className="setting-container">{children}</div>;
};

SettingContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default SettingContainer;
