import React from 'react';
import { useSelector } from 'react-redux';
import '@scss/Chat.scss';
import Message from './Message';

const Chat = () => {
	const messages = useSelector((state) => state.messages.messages);

	return (
		<div className="chat">
			<div className="chat__content">
				<ul>
					{messages.map((message, index) => (
						<Message index={index} key={message.id} message={message} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Chat;
