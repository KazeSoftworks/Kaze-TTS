import tmi from 'tmi.js';

const getClient = (username, token) => {
	const client = new tmi.Client({
		options: { skipUpdatingEmotesets: true, debug: true },
		identity: {
			username,
			password: token,
		},
		channels: [username],
		messagesLogLevel: 'info',
	});
	return client;
};

export default getClient;
