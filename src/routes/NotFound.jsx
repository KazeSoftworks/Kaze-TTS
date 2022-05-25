import { faHome } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button';
import '@scss/NotFound.scss';
import { PATH_HOME } from '@utils/constants';

const NotFound = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(PATH_HOME);
	};

	return (
		<div className="not-found">
			<h1 className="not-found__title">404</h1>
			<h2 className="not-found__subtitle">Not found</h2>
			<Button onClick={handleClick} startIcon={faHome}>
				Go back to homepage
			</Button>
		</div>
	);
};

export default NotFound;
