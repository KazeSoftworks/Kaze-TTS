import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AUTH_URI, VALIDATE_URI, PATH_HOME } from '@utils/constants';
import { setAuth } from '@features/authSlice';

const Twitch = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { search, hash } = location;

	const getQuery = (url) => {
		const query = url.substring(1);
		const vars = query.split('&');
		const result = {};
		vars.forEach((part) => {
			const item = part.split('=');
			result[item[0]] = decodeURIComponent(item[1]);
		});
		return result;
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
						})
					);
					navigate(PATH_HOME);
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
					<div>
						<button
							type="button"
							onClick={() => window.open(AUTH_URI, '_self')}
						>
							Retry
						</button>
					</div>
				</>
			)}
			{!search && !hash && (
				<>
					<div>
						Tienes que ingresar a la página de Twitch para acceder a la app.
					</div>
					<div>
						<button type="button" onClick={() => navigate(PATH_HOME)}>
							Regresar
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Twitch;
