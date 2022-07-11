export interface BTTVEmote {
	id: string;
	code: string;
	imageType: string;
	userId: string;
}

export interface BTTVEmoteShared extends Omit<BTTVEmote, 'userId'> {
	user: {
		id: string;
		name: string;
		displayName: string;
		providerId: string;
	};
}

export interface BTTVChannelEmoteRequest {
	id: string;
	bots: string[];
	avatar: string;
	channelEmotes: BTTVEmote[];
	sharedEmotes: BTTVEmoteShared[];
}
