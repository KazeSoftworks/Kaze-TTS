const parseBbtvEmote = (response) => {
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

export { parseBbtvEmote, parseTwitchEmote };
