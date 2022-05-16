const containsBBTVEmotes = (msg, dictionary) => {
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
				return { ...prev, [dictionary[current]]: positions };
			}
			return prev;
		}, {});
		return emotePositions;
	}
	return null;
};

const parseTwitchMessage = ({ tags, message }, bttvDictionary) => {
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
	} = tags;

	// const bttvDictionary = window.store.getState().twitch.betterTTVEmotes;

	return {
		badges,
		color,
		emotes,
		emotesBBTV: bttvDictionary
			? containsBBTVEmotes(message, bttvDictionary)
			: null,
		displayName,
		userId,
		id,
		ts,
		mod,
		subscriber,
		turbo,
		text: message,
	};
};
export { containsBBTVEmotes, parseTwitchMessage };
