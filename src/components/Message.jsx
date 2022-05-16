import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message }) => {
	const getMessageColor = () => {
		if (message.color) {
			return message.color;
		}
		return '#000';
	};

	// const getMessage = () => {
	// 	const textComponent = <span />;
	// };

	return (
		<li>
			<span className="author" style={{ color: getMessageColor() }}>
				{message.displayName}:
			</span>
			<span className="message">{message.text}</span>
		</li>
	);
};

Message.propTypes = {
	message: PropTypes.shape({
		badges: PropTypes.objectOf(PropTypes.string).isRequired,
		color: PropTypes.string,
		displayName: PropTypes.string.isRequired,
		emotes: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
		emotesBBTV: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
		id: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		mod: PropTypes.bool.isRequired,
		subscriber: PropTypes.bool.isRequired,
		ts: PropTypes.string.isRequired,
		turbo: PropTypes.bool.isRequired,
		userId: PropTypes.string.isRequired,
	}).isRequired,
};

export default Message;
