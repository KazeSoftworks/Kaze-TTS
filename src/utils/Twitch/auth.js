import axios from 'axios';
import { useCookies } from 'react-cookie';

const AuthenticateTwitch = () => {
	return axios({
		method: 'post',
		url: 'https://id.twitch.tv/oauth2/token',
		data: {
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
			grant_type: 'client_credentials',
		},
	});
};

const VerifyAuthCookie = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['kaze-tts']);
	const authCookie = cookies['kaze-tts'];
	if (authCookie) {
		return true;
	}
};

export const useAuthenticate = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['kaze-tts']);
	const authCookie = cookies['kaze-tts'];
	if (authCookie) {
		console.log('Ya hay cookie');
	} else {
		AuthenticateTwitch().then((response) => {
			console.log(response.data);
			setCookie('kaze-tts', response.data.access_token, { path: '/' });
			console.log('Cookie creada');
		});
	}
};
