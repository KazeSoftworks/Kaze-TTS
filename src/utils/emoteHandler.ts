import { BTTVChannelEmoteRequest, BTTVEmote } from 'bttv';
import { ApiEmote } from 'twitch';
import { Emote } from 'types';

const getTwitchEmoteUrl = (emoteId: string) => {
	return `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/3.0`;
};

const getBttvEmoteUrl = (emoteId: string) => {
	return `https://cdn.betterttv.net/emote/${emoteId}/3x`;
};

const parseBttvEmote = (response: BTTVEmote[]) => {
	const bbtv: Emote = {};
	if (!response) {
		return bbtv;
	}
	response.forEach((item) => {
		if (item.code) {
			bbtv[item.code] = item.id;
		}
	});
	return bbtv;
};

const parseTwitchEmote = (response: ApiEmote[]) => {
	const twitch: Emote = {};
	response.forEach((item) => {
		if (item.name) {
			twitch[item.name] = item.id;
		}
	});
	return twitch;
};

const parseChannelBttvEmote = (response: BTTVChannelEmoteRequest) => {
	const bttv: Emote = {};
	if (!response) {
		return bttv;
	}
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
