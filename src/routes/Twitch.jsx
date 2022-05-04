import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_URI, VALIDATE_URI } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../utils/Redux/authSlice';

const Twitch = () => {
	const [error, setError] = React.useState(null);
	const dispatch = useDispatch();
	const location = useLocation();
	let navigate = useNavigate();
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
					dispatch(
						setAuth({
							token: getQuery(hash).access_token,
							userId: res.data.user_id,
							username: res.data.login,
						})
					);
					navigate('/');
				})
				.catch((err) => {
					console.log('Error: ', err);
				});
		}
	}, [hash, navigate, dispatch]);

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
