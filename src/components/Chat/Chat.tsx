import React from 'react';
import '@scss/Chat.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlug, faSync } from '@fortawesome/free-solid-svg-icons';
import Message from './Message';
import { useAppSelector } from 'hooks/reduxHooks';

const Chat = () => {
	const messages = useAppSelector((state) => state.messages.messages);
	const isLoadingChat = useAppSelector((state) => state.twitch.isLoadingChat);
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const isLoadingValidate = useAppSelector(
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
					{messages.map((message) => (
						<Message key={message.id} message={message} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default Chat;
