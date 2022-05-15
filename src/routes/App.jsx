import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '@container/Layout';
import Header from '@components/Header';
import '@scss/App.scss';
import Chat from '@components/Chat';
import { validateToken } from '@features/authSlice';
import {
	getFollowersInfo,
	getGlobalEmotesInfo,
	getUserInfo,
	getGlobalBTTVEmotesInfo,
} from '@features/twichSlice';
import Footer from '@components/Footer';
import Loader from '@components/Loader';
import getClient from '@utils/chat';

const App = () => {
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
					setLoading(false);
					return dispatch(getGlobalBTTVEmotesInfo()).unwrap();
				})
				.then(() => {
					console.log('global BBTV info loaded');
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
			chatClient.on('message', (channel, tags, message, self) => {
				// Ignore echoed messages.
				if (self) {
					return;
				}
				console.log(tags, message);
				// dispatch(messagesSlice.actions.addMessage({ tags, message }));
			});
			setAppLoaded(true);
		}
	}, [chatClient, appLoaded]);

	return (
		<div className="App">
			<Layout>
				<Header />
				<Chat />
				<Footer />
				{loading && <Loader />}
			</Layout>
		</div>
	);
};

export default App;
