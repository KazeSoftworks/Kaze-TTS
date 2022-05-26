import React from 'react';
import { useSelector } from 'react-redux';
import '@scss/Chat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';

const Chat = () => {
	const messages = useSelector((state) => state.messages.messages);
	const isLoadingChat = useSelector((state) => state.twitch.isLoadingChat);

	return (
		<div className="chat">
			<div className="chat__content">
				{isLoadingChat && (
					<div className="chat__content__loading">
						<FontAwesomeIcon icon={faSync} spin />
						<span>Connecting to chat</span>
					</div>
				)}
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
