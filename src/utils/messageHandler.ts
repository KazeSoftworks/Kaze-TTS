import { ChatUserstate } from 'tmi.js';
import { Emote } from 'types';

const containsBBTVEmotes = (msg: string, dictionary: Emote) => {
	if (!dictionary) {
		return null;
	}
	const emoteCode = Object.keys(dictionary);
	if (emoteCode.some((substring) => msg.includes(substring))) {
		const emotePositions = emoteCode.reduce((prev, current) => {
			const positions = [];
			const rgxFriendlyWord = current.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
			const regex = new RegExp(`(?<=\\s|^)${rgxFriendlyWord}(?=\\s|$)`, 'g');
			let indexOccurence = msg.search(regex);
			while (indexOccurence >= 0) {
				// console.log(indexOccurence);
				positions.push(
					`${indexOccurence}-${indexOccurence + current.length - 1}`
				);
				const index = msg
					.substring(indexOccurence + current.length, msg.length)
					.search(regex);
				if (index === -1) {
					break;
				}
				indexOccurence += index + current.length;
			}
			if (positions.length > 0) {
				return {
					...prev,
					[current]: { code: dictionary[current], positions },
				};
			}
			return prev;
		}, {});
		return emotePositions;
	}
	return null;
};

const containsTwitchEmotes = (msg: string, emotes: ChatUserstate['emotes']) => {
	// Get the emote codes from the message
	if (!emotes) {
		return null;
	}
	const emoteCodes = Object.keys(emotes).reduce((prev, current) => {
		const position = emotes[current][0].split('-');
		const start = parseInt(position[0], 10);
		const end = parseInt(position[1], 10);
		const emoteCode = msg.substring(start, end + 1);
		return {
			...prev,
			[emoteCode]: {
				code: current,
				positions: emotes[current],
			},
		};
	}, {});
	return emoteCodes;
};

interface ParseTwitchMessage {
	message: string;
	tags: ChatUserstate;
}
const parseTwitchMessage = (
	{ tags, message }: ParseTwitchMessage,
	bttvDictionary: Emote
) => {
	const {
		badges,
		color,
		emotes,
		'display-name': displayName,
		'user-id': userId,
		id,
		'tmi-sent-ts': ts,
		mod,
		subscriber,
		turbo,
		username,
	} = tags;

	// const bttvDictionary = window.store.getState().twitch.betterTTVEmotes;
	return {
		badges,
		color,
		emotes: message ? containsTwitchEmotes(message, emotes) : null,
		emotesBBTV: containsBBTVEmotes(message, bttvDictionary),
		displayName,
		userId,
		id,
		ts,
		mod,
		subscriber,
		turbo,
		username,
		vip: badges ? !!badges.vip : false,
		broadcaster: badges ? !!badges.broadcaster : false,
		text: message,
	};
};

const formatTime = (ts: string) => {
	const a = new Date(Number(ts));
	const formattedNumber = (n: number) => (n < 10 ? `0${n}` : n);
	const year = formattedNumber(a.getFullYear());
	const month = formattedNumber(a.getMonth());
	const date = formattedNumber(a.getDate());
	const hour = formattedNumber(a.getHours());
	const min = formattedNumber(a.getMinutes());
	const sec = formattedNumber(a.getSeconds());
	const time = `${date}/${month}/${year} ${hour}:${min}:${sec}`;
	return time;
};

export const parseTags = (tags: ChatUserstate) => {
	const {
		badges,
		'display-name': displayName,
		mod,
		subscriber,
		username,
	} = tags;

	return {
		displayName,
		mod,
		subscriber,
		username,
		vip: badges ? !!badges.vip : false,
		broadcaster: badges ? !!badges.broadcaster : false,
	};
};

export { containsBBTVEmotes, parseTwitchMessage, formatTime };
