const getTwitchEmoteUrl = (emoteId) => {
	return `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/3.0`;
};

const getBttvEmoteUrl = (emoteId) => {
	return `https://cdn.betterttv.net/emote/${emoteId}/3x`;
};

const parseBttvEmote = (response) => {
	const bbtv = {};
	response.forEach((item) => {
		if (item.code) {
			bbtv[item.code] = item.id;
		}
	});
	return bbtv;
};

const parseTwitchEmote = (response) => {
	const twitch = {};
	response.forEach((item) => {
		if (item.name) {
			twitch[item.name] = item.id;
		}
	});
	return twitch;
};

export { parseBttvEmote, parseTwitchEmote, getTwitchEmoteUrl, getBttvEmoteUrl };
