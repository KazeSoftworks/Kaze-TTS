import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../container/Layout';
import Header from '../components/Header';
import '../scss/App.scss';
import Chat from '../components/Chat';
import { validateToken } from '../utils/Redux/authSlice';
import {
	getFollowersInfo,
	getGlobalEmotesInfo,
	getUserInfo,
} from '../utils/Redux/twichSlice';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const App = () => {
	const dispatch = useDispatch();
	const { token, isAuthenticated } = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(null);
	const [chatClient, setChatClient] = useState(null);

	// client.connect().catch((err) => {
	// 	console.error(err);
	// });

	// client.on('message', (channel, tags, message, self) => {
	// 	// Ignore echoed messages.
	// 	if (self) {
	// 		return;
	// 	}
	// 	dispatch(messagesSlice.actions.addMessage({ tags, message }));
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
				})
				.then(() => {
					console.log('loading finished');
				});
		}
	}, [isAuthenticated, dispatch]);

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
