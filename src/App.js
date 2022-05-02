import React from 'react';
import Layout from './container/Layout';
import Header from './components/Header';
import './scss/App.scss';
//import { useAuthenticate } from './utils/Twitch/auth';
import { client } from './utils/Twitch/chat';
import { useDispatch } from 'react-redux';
import { messagesSlice } from './utils/Redux/messagesSlice';
import Chat from './components/Chat';

function App() {
	const dispatch = useDispatch();
	client.connect().catch((err) => {
		console.error(err);
	});

	client.on('message', (channel, tags, message, self) => {
		// Ignore echoed messages.
		if (self) {
			return;
		}
		dispatch(messagesSlice.actions.addMessage({ tags, message }));
	});

	client.on(
		'messagedeleted',
		(channel, username, deletedMessage, userstate) => {
			dispatch(messagesSlice.actions.deleteMessage({ userstate }));
		}
	);

	return (
		<div className="App">
			<Layout>
				<Header />
				<Chat />
			</Layout>
		</div>
	);
}

export default App;
