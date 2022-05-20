const getTwitchEmoteUrl = (emoteId) => {
	return `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/3.0`;
};

const getBttvEmoteUrl = (emoteId) => {
	return `https://cdn.betterttv.net/emote/${emoteId}/3x`;
};

const parseBttvEmote = (response) => {
	if (!response) {
		return null;
	}
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

const parseChannelBttvEmote = (response) => {
	if (!response) {
		return null;
	}
	const bttv = {};
	const { channelEmotes, sharedEmotes } = response;
	sharedEmotes.forEach((item) => {
		bttv[item.code] = item.id;
	});
	channelEmotes.forEach((item) => {
		bttv[item.code] = item.id;
	});
	return bttv;
};

export {
	parseBttvEmote,
	parseTwitchEmote,
	parseChannelBttvEmote,
	getTwitchEmoteUrl,
	getBttvEmoteUrl,
};
