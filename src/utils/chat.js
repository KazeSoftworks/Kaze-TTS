import { addMessage } from '@features/messagesSlice';
import {
	addChatter,
	removeChatter,
	setLoadingChat,
} from '@features/twichSlice';
import tmi from 'tmi.js';
import { parseTwitchMessage } from './messageHandler';

const setTmiClient = ({
	username,
	token,
	dispatch = () => {},
	audioEnabled,
}) => {
	const client = new tmi.Client({
		options: { skipUpdatingEmotesets: true, debug: true },
		identity: {
			username,
			password: token,
		},
		channels: [username],
		messagesLogLevel: 'info',
	});
	client
		.connect()
		.then(() => {
			dispatch(setLoadingChat(false));
		})
		.catch((err) => {
			console.error(err);
			dispatch(setLoadingChat(false));
		});
	client.on('message', (__, tags, message, self) => {
		if (self) {
			return;
		}
		if (tags.username !== username) {
			dispatch(addChatter(parseTwitchMessage({ tags })));
		}
		if (audioEnabled) {
			// Dispatch message to audio reader redux
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
