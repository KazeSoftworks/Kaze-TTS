import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '@scss/Loader.scss';

const Loader = () => {
	return (
		<div className="loader">
			<h2>Loading</h2>
			<FontAwesomeIcon icon={faSync} spin />
		</div>
	);
};

export default Loader;
