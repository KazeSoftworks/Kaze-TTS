import React from 'react';
import { useSelector } from 'react-redux';
import '../scss/Chat.scss';
import Message from './Message';

const Chat = () => {
	const { messagesList } = useSelector((state) => state.messages);

	return (
		<div className="chat">
			<ul>
				{messagesList.map((message) => (
					<Message
						id={message.tags.id}
						author={message.tags['display-name']}
						message={message.message}
					/>
				))}
			</ul>
		</div>
	);
};

export default Chat;
