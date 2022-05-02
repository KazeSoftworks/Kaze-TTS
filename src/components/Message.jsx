import React from 'react';

const Message = ({ message, author }) => {
	return (
		<li>
			<span className="author">{author}: </span>
			<span className="message">{message}</span>
		</li>
	);
};

export default Message;
