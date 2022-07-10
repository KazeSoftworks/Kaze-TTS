import { Badges } from 'tmi.js';

export interface MessageType {
	badges: Badges | undefined;
	id: string | undefined;
	color: string | undefined;
	emotes: Emotes | null;
	emotesBBTV: Emotes | null;
	displayName: string | undefined;
	userId: string | undefined;
	ts: string | undefined;
	mod: boolean | undefined;
	subscriber: boolean | undefined;
	turbo: boolean | undefined;
	username: string | undefined;
	vip: boolean | undefined;
	broadcaster: boolean | undefined;
	text: string;
}

export interface Emotes {
	[key: string]: {
		code: string;
		positions: string[];
	};
}

export interface Chatter {
	username: string;
	displayName: string | undefined;
	broadcaster: boolean | undefined;
	mod: boolean | undefined;
	vip: boolean | undefined;
	subscriber: boolean | undefined;
	isLurker: boolean | undefined;
}

export interface Chatters {
	[key: string]: Chatter;
}

export interface Badge {
	[key: string]: { [key: string]: string };
}