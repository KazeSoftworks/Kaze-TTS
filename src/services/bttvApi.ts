import axios from 'axios';
import { BTTV_API } from '@utils/constants';
import { URLSearchParamsInit } from 'react-router-dom';

const baseQuery = (url: string, params?: URLSearchParamsInit) => {
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

const getChannelBttvEmotes = async (userId: string) => {
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
