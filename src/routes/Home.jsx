import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '@components/Chat';
import { validateToken } from '@features/authSlice';
import {
	getFollowersInfo,
	getUserInfo,
	getGlobalChatBadgesInfo,
	getChatBadgesInfo,
	addChatter,
	removeChatter,
} from '@features/twichSlice';
import Loader from '@components/Loader';
import getClient from '@utils/chat';
import {
	addMessage,
	getGlobalBTTVEmotesInfo,
	getGlobalEmotesInfo,
	getChannelBttvEmotesInfo,
} from '@features/messagesSlice';
import { parseTwitchMessage } from '@utils/messageHandler';

const Home = () => {
	const dispatch = useDispatch();
	const { username, token, isAuthenticated } = useSelector(
		(state) => state.auth
	);
	const [loading, setLoading] = useState(null);
	const [appLoaded, setAppLoaded] = useState(false);
	const [chatClient, setChatClient] = useState(null);

	// client.connect().catch((err) => {
	// 	console.error(err);
	// });

	// client.on(
	// 	'messagedeleted',
	// 	(channel, username, deletedMessage, userstate) => {
	// 		dispatch(messagesSlice.actions.deleteMessage({ userstate }));
	// 	}
	// );

	useEffect(() => {
		if (token) {
			dispatch(validateToken());
		}
	}, [token, dispatch]);

	useEffect(() => {
		if (isAuthenticated) {
			setLoading(true);
			dispatch(getUserInfo())
				.unwrap()
				.then(() => {
					console.log('user info loaded');
					return dispatch(getFollowersInfo()).unwrap();
				})
				.then(() => {
					console.log('followers info loaded');
					return dispatch(getGlobalEmotesInfo()).unwrap();
				})
				.then(() => {
					console.log('global emotes info loaded');
					return dispatch(getGlobalChatBadgesInfo()).unwrap();
				})
				.then(() => {
					console.log('global chat info loaded');
					return dispatch(getChatBadgesInfo()).unwrap();
				})
				.then(() => {
					console.log('chat badges info loaded');
					setLoading(false);
					return dispatch(getGlobalBTTVEmotesInfo()).unwrap();
				})
				.then(() => {
					console.log('global BBTV info loaded');
					setLoading(false);
					return dispatch(getChannelBttvEmotesInfo()).unwrap();
				})
				.then(() => {
					console.log('channel BBTV info loaded');
					console.log('loading finished');
					setChatClient(getClient(username, token));
				});
		}
	}, [isAuthenticated, dispatch]);

	useEffect(() => {
		if (chatClient && !appLoaded) {
			chatClient.connect().catch((err) => {
				console.error(err);
			});
			chatClient.on('message', (__, tags, message, self) => {
				// Ignore echoed messages.
				if (self) {
					return;
				}
				if (tags.username !== username) {
					dispatch(addChatter(parseTwitchMessage({ tags })));
				}
				dispatch(addMessage({ tags, message }));
			});
			chatClient.on('join', (__, user, self) => {
				// Ignore echoed messages.
				if (self) {
					return;
				}
				dispatch(addChatter({ username: user, isLurker: true }));
			});
			chatClient.on('part', (__, user, self) => {
				// Ignore echoed messages.
				if (self) {
					return;
				}
				dispatch(removeChatter(user));
			});
			setAppLoaded(true);
		}
	}, [chatClient, appLoaded]);

	return (
		<>
			<Chat />
			{loading && <Loader />}
		</>
	);
};

export default Home;
