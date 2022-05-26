import { addMessage } from '@features/messagesSlice';
import { addChatter, removeChatter } from '@features/twichSlice';
import tmi from 'tmi.js';
import { parseTwitchMessage } from './messageHandler';

const setTmiClient = ({ username, token, dispatch = () => {} }) => {
	const client = new tmi.Client({
		options: { skipUpdatingEmotesets: true, debug: true },
		identity: {
			username,
			password: token,
		},
		channels: [username],
		messagesLogLevel: 'info',
	});
	client.connect().catch((err) => {
		console.error(err);
	});
	client.on('message', (__, tags, message, self) => {
		if (self) {
			return;
		}
		if (tags.username !== username) {
			dispatch(addChatter(parseTwitchMessage({ tags })));
		}
		dispatch(addMessage({ tags, message }));
	});
	client.on('join', (__, user, self) => {
		if (self) {
			return;
		}
		dispatch(addChatter({ username: user, isLurker: true }));
	});
	client.on('part', (__, user, self) => {
		// Ignore echoed messages.
		if (self) {
			return;
		}
		dispatch(removeChatter(user));
	});
	return client;
};

export default setTmiClient;
