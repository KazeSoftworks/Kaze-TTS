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
			if (error.response.status === 404) {
				return null;
			}
			throw new Error(error.response.data);
		});
};

const getChannelBttvEmotes = async (userId) => {
	return baseQuery(`users/twitch/${userId}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 404) {
				return null;
			}
			throw new Error(error.response.data);
		});
};

export { getGlobalBTTVEmotes, getChannelBttvEmotes };
