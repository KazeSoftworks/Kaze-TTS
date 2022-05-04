import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AUTH_URI, VALIDATE_URI } from '../utils/constants';
import axios from 'axios';

const Twitch = () => {
	const [error, setError] = React.useState(null);
	const location = useLocation();
	const { search, hash } = location;

	const getQuery = (search) => {
		const query = search.substring(1);
		const vars = query.split('&');
		let result = {};
		vars.forEach(function (part) {
			var item = part.split('=');
			result[item[0]] = decodeURIComponent(item[1]);
		});
		return result;
	};

	const RetryButton = () => {
		return (
			<button type="button" onClick={() => window.open(AUTH_URI, '_self')}>
				Retry
			</button>
		);
	};

	useEffect(() => {
		if (hash) {
			axios
				.get(VALIDATE_URI, {
					headers: {
						Authorization: `Bearer ${getQuery(hash).access_token}`,
					},
				})
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.log('Error: ', err);
				});
		}
	}, [hash]);

	return (
		<div>
			{hash && <div>Verifying data</div>}
			{search && (
				<>
					<div>
						Has negado el permiso para acceder a la información de Twitch.
					</div>
					<div>{RetryButton()}</div>
				</>
			)}
		</div>
	);
};

export default Twitch;
