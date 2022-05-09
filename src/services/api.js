import axios from 'axios';
import { API, CLIENT_ID } from '../utils/constants';

const baseQuery = (url, token, params) => {
	return axios({
		method: 'get',
		baseURL: API,
		url,
		headers: {
			'Client-Id': CLIENT_ID,
			Authorization: `Bearer ${token}`,
		},
		params,
	});
};

const getUser = async (token, userId) => {
	const params = new URLSearchParams();
	params.append('id', userId);
	return baseQuery('/users', token, params)
		.then((response) => {
			return response.data.data[0];
		})
		.catch((error) => {
			throw new Error(error.response.data);
		});
};

export { getUser };
