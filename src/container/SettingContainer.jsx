import React from 'react';
import PropTypes from 'prop-types';
import '@scss/SettingContainer.scss';

const SettingContainer = ({ children }) => {
	return <div className="setting-container">{children}</div>;
};

SettingContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default SettingContainer;
