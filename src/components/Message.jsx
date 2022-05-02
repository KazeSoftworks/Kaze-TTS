import React from 'react';

const Message = ({ id, message, author }) => {
	return (
		<li key={id}>
			<span className="author">{author}: </span>
			<span className="message">{message}</span>
		</li>
	);
};

export default Message;
