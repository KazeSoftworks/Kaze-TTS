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
	text: string | undefined;
}

export interface Emotes {
	[key: string]: string;
}
