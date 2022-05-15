import axios from 'axios';
import { BTTV_API } from '@utils/constants';

const baseQuery = (url, params) => {
	return axios({
		method: 'get',
		baseURL: BTTV_API,
		url,
		params,
	});
};

const getGlobalBTTVEmotes = async () => {
	return baseQuery('emotes/global')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw new Error(error.response.data);
		});
};

export default getGlobalBTTVEmotes;
