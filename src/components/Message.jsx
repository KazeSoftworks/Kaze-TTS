import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, author }) => {
	return (
		<li>
			<span className="author">{author}: </span>
			<span className="message">{message}</span>
		</li>
	);
};

Message.propTypes = {
	message: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
};

export default Message;
