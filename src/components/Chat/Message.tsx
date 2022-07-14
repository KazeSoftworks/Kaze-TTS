import React, { memo, ReactElement } from 'react';
import { getTwitchEmoteUrl, getBttvEmoteUrl } from '@utils/emoteHandler';
import '@scss/Message.scss';
import { formatTime } from '@utils/messageHandler';
import { useAppSelector } from 'hooks/reduxHooks';
import { MessageType } from 'types';

interface MessageProps {
	message: MessageType;
}

const Message = ({ message }: MessageProps) => {
	const globalBadges = useAppSelector((state) => state.twitch.globalBadges);
	const chatBadges = useAppSelector((state) => state.twitch.chatBadges);
	const getMessageColor = () => {
		if (message.color) {
			return message.color;
		}
		return '#000';
	};

	const getAuthorBadges = () => {
		const badgesComponent: ReactElement[] = [];
		if (!message.badges) {
			return badgesComponent;
		}
		Object.keys(message.badges).forEach((badge) => {
			const badgeData = message.badges?.[badge];
			if (
				globalBadges &&
				globalBadges[badge] &&
				badgeData &&
				globalBadges[badge][badgeData]
			) {
				badgesComponent.push(
					<img
						className="message__text__emote"
						key={`${message.id}-${message.userId}-${badge}`}
						src={globalBadges[badge][badgeData]}
						alt={badge}
						title={badge}
					/>
				);
			} else if (
				chatBadges &&
				chatBadges[badge] &&
				badgeData &&
				chatBadges[badge][badgeData]
			) {
				badgesComponent.push(
					<img
						className="message__text__emote"
						key={`${message.id}-${message.userId}-${badge}`}
						src={chatBadges[badge][badgeData]}
						alt={badge}
						title={badge}
					/>
				);
			}
		});

		return badgesComponent;
	};

	const getMessage = () => {
		const textComponent: ReactElement[] = [];
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
				textComponent.push(<span>{word}</span>);
			}
		});
		return textComponent;
	};

	return (
		<li className="message">
			{message.ts && (
				<span className="message__timestamp">{formatTime(message.ts)}</span>
			)}
			<span className="message__author" style={{ color: getMessageColor() }}>
				{getAuthorBadges()}
				{message.displayName}:
			</span>
			<span className="message__text">{getMessage()}</span>
		</li>
	);
};

export default memo(Message);
