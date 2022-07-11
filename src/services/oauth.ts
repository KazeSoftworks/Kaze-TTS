import axios from 'axios';
import { CLIENT_ID, ID_API } from '@utils/constants';

const baseQuery = (url: string, token: string) => {
	return axios({
		method: 'get',
		baseURL: ID_API,
		url,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const validate = async (token: string) => {
	return baseQuery('/validate', token)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw new Error(error.response.data);
		});
};

const revoke = async (token: string) => {
	const params = new URLSearchParams();
	params.append('client_id', CLIENT_ID || 'ERROR_CHECK_ENV');
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
