import tmi from 'tmi.js';

const client = new tmi.Client({
	options: { skipUpdatingEmotesets: true, debug: true },
	identity: {
		username: process.env.REACT_APP_CLIENT_USERNAME,
		password: process.env.REACT_APP_CLIENT_OAUTH,
	},
	channels: [process.env.REACT_APP_CHANNEL],
	messagesLogLevel: 'info',
});

export default client;
