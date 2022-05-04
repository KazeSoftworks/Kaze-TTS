import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../scss/NotFound.scss';

const NotFound = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/');
	};

	return (
		<div className="not-found">
			<h1 className="not-found__title">404</h1>
			<h2 className="not-found__subtitle">Not found</h2>
			<button type="button" className="not-found__button" onClick={handleClick}>
				<HomeIcon /> <span>Go back to home</span>
			</button>
		</div>
	);
};

export default NotFound;
