import axios from 'axios';
import { ID_API } from '../utils/constants';

const baseQuery = (url, token) => {
	return axios({
		method: 'get',
		baseURL: ID_API,
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const validate = async (token) => {
	return baseQuery('/validate', token)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw new Error(error.response.data);
		});
};

const revoke = async (token) => {
	const params = new URLSearchParams();
	params.append('client_id', process.env.REACT_APP_CLIENT_ID);
	params.append('token', token);

	axios({
		method: 'post',
		baseURL: ID_API,
		url: '/revoke',
		headers: {
			'content-type': `application/x-www-form-urlencoded`,
		},
		params,
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw new Error(error);
		});
};

export { validate, revoke };
