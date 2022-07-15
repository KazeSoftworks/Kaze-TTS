import { addMessage, addTTSMessage } from '@features/messagesSlice';
import {
	addChatter,
	removeChatter,
	setLoadingChat,
} from '@features/twichSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import tmiJs from 'tmi.js';
import store from '@features/store';
import { parseTags } from '@utils/messageHandler';

interface ClientEngineProps {
	username: string;
	token: string;
}
const ClientEngine = ({ username, token }: ClientEngineProps) => {
	const dispatch = useDispatch();

	const client = new tmiJs.Client({
		options: {
			skipUpdatingEmotesets: true,
			messagesLogLevel: 'info',
			debug: true,
		},
		identity: {
			username,
			password: token,
		},
		channels: [username],
	});

	useEffect(() => {
		dispatch(setLoadingChat(true));
		client
			.connect()
			.then(() => {
				dispatch(setLoadingChat(false));
			})
			.catch((err) => {
				console.error(err);
				dispatch(setLoadingChat(false));
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
		client.on('message', (__, tags, message, self) => {
			const audio = store.getState().settings.audioEnabled;
			if (self) {
				return;
			}
			if (audio) {
				dispatch(addTTSMessage({ tags, message }));
			}
			dispatch(addMessage({ tags, message }));
			if (tags.username !== username) {
				dispatch(addChatter(parseTags(tags)));
			}
		});
	}, [client, dispatch, username]);

	return null;
};

export default ClientEngine;
