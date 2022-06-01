import React from 'react';
import { useSelector } from 'react-redux';
import '@scss/Chat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faSync } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';

const Chat = () => {
	const messages = useSelector((state) => state.messages.messages);
	const isLoadingChat = useSelector((state) => state.twitch.isLoadingChat);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isLoadingValidate = useSelector(
		(state) => state.auth.isLoadingValidate
	);

	return (
		<div className="chat">
			<div className="chat__content">
				{!isAuthenticated && !isLoadingValidate && (
					<div className="chat__content__loading">
						<FontAwesomeIcon icon={faPlug} />
						<span>Please login to Twitch</span>
					</div>
				)}
				{(isLoadingValidate || isLoadingChat) && (
					<div className="chat__content__loading">
						<FontAwesomeIcon icon={faSync} spin />
						{isLoadingChat && <span>Connecting to chat</span>}
						{isLoadingValidate && <span>Twitch is being validated</span>}
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
