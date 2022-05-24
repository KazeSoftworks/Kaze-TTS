import React from 'react';
import PropTypes from 'prop-types';
import { getTwitchEmoteUrl, getBttvEmoteUrl } from '@utils/emoteHandler';
import { useSelector } from 'react-redux';
import '@scss/Message.scss';
import { formatTime } from '@utils/messageHandler';

const Message = ({ message, index }) => {
	const globalBadges = useSelector((state) => state.twitch.globalBadges);
	const chatBadges = useSelector((state) => state.twitch.chatBadges);
	const getMessageColor = () => {
		if (message.color) {
			return message.color;
		}
		return '#000';
	};

	const getAuthorBadges = () => {
		const badgesComponent = [];
		if (!message.badges) {
			return badgesComponent;
		}
		Object.keys(message.badges).forEach((badge) => {
			if (globalBadges[badge] && globalBadges[badge][message.badges[badge]]) {
				badgesComponent.push(
					<img
						className="message__text__emote"
						key={`${message.id}-${message.userId}-${badge}`}
						src={globalBadges[badge][message.badges[badge]]}
						alt={badge}
						title={badge}
					/>
				);
			} else if (
				chatBadges[badge] &&
				chatBadges[badge][message.badges[badge]]
			) {
				badgesComponent.push(
					<img
						className="message__text__emote"
						key={`${message.id}-${message.userId}-${badge}`}
						src={chatBadges[badge][message.badges[badge]]}
						alt={badge}
						title={badge}
					/>
				);
			}
		});

		return badgesComponent;
	};

	const getMessage = () => {
		const textComponent = [];
		const textArray = message.text.split(/(\s+)/);
		textArray.forEach((word, imageIndex) => {
			if (message.emotes && message.emotes[word]) {
				textComponent.push(
					<img
						className="message__text__emote"
						// eslint-disable-next-line react/no-array-index-key
						key={`${message.id}-${imageIndex}`}
						src={getTwitchEmoteUrl(message.emotes[word].code)}
						alt={word}
					/>
				);
			} else if (message.emotesBBTV && message.emotesBBTV[word]) {
				textComponent.push(
					<img
						className="message__text__emote"
						// eslint-disable-next-line react/no-array-index-key
						key={`${message.id}-${imageIndex}`}
						src={getBttvEmoteUrl(message.emotesBBTV[word].code)}
						alt={word}
					/>
				);
			} else {
				textComponent.push(word);
			}
		});
		return textComponent;
	};

	return (
		<li className="message">
			<span className="message__timestamp">{formatTime(message.ts)}</span>
			<span className="message__author" style={{ color: getMessageColor() }}>
				{getAuthorBadges()}
				{message.displayName}:
			</span>
			<span className="message__text">{getMessage()}</span>
		</li>
	);
};

Message.propTypes = {
	index: PropTypes.number.isRequired,
	message: PropTypes.shape({
		badges: PropTypes.objectOf(PropTypes.string),
		color: PropTypes.string,
		displayName: PropTypes.string.isRequired,
		emotes: PropTypes.objectOf(
			PropTypes.shape({
				code: PropTypes.string,
				position: PropTypes.arrayOf(PropTypes.string),
			})
		),
		emotesBBTV: PropTypes.objectOf(
			PropTypes.shape({
				code: PropTypes.string,
				position: PropTypes.arrayOf(PropTypes.string),
			})
		),
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
