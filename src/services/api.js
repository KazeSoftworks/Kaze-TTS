import axios from 'axios';
import { API, CLIENT_ID } from '../utils/constants';

const instance = (token) => {
	return axios.create({
		baseURL: API,
		timeout: 1000,
		headers: { 'Client-Id': CLIENT_ID, Authorization: `Bearer ${token}` },
	});
};
