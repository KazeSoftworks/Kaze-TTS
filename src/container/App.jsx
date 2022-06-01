import React, { useEffect } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { Outlet } from 'react-router-dom';
import '@scss/App.scss';
import SideMenu from '@components/SideMenu/SideMenu';
import { validateToken } from '@features/authSlice';
import {
	getFollowersInfo,
	getUserInfo,
	getGlobalChatBadgesInfo,
	getChatBadgesInfo,
} from '@features/twichSlice';
import {
	getGlobalBTTVEmotesInfo,
	getGlobalEmotesInfo,
	getChannelBttvEmotesInfo,
} from '@features/messagesSlice';
import { useDispatch, useSelector } from 'react-redux';
import AudioEngine from '@components/AudioEngine';
import ClientEngine from '@components/ClientEngine';

const App = () => {
	const dispatch = useDispatch();
	const username = useSelector((state) => state.auth.username);
	const token = useSelector((state) => state.auth.token);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	useEffect(() => {
		if (token) {
			dispatch(validateToken());
		}
	}, [token, dispatch]);

	useEffect(() => {
		if (isAuthenticated) {
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
					return dispatch(getGlobalBTTVEmotesInfo()).unwrap();
				})
				.then(() => {
					console.log('global BBTV info loaded');
					return dispatch(getChannelBttvEmotesInfo()).unwrap();
				})
				.then(() => {
					console.log('channel BBTV info loaded');
					console.log('loading finished');
				});
		}
	}, [isAuthenticated, dispatch]);

	return (
		<>
			<Header />
			<div className="content-container">
				<AudioEngine />
				{isAuthenticated && <ClientEngine username={username} token={token} />}
				<Outlet />
				<SideMenu />
			</div>
			<Footer />
		</>
	);
};

export default App;
