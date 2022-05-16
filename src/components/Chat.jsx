import React from 'react';
import { useSelector } from 'react-redux';
import '@scss/Chat.scss';
import Message from './Message';

const Chat = () => {
	const { messages } = useSelector((state) => state.messages);

	return (
		<div className="chat">
			<ul>
				{messages.map((message) => (
					<Message key={message.id} message={message} />
				))}
			</ul>
		</div>
	);
};

export default Chat;
