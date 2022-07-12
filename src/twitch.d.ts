export interface User {
	id: string;
	login: string;
	display_name: string;
	type: string;
	broadcaster_type: string;
	description: string;
	profile_image_url: string;
	offline_image_url: string;
	view_count: number;
	email: string;
	created_at: string;
}

export interface ApiBadges {
	set_id: string;
	versions: {
		id: string;
		image_url_1x: string;
		image_url_2x: string;
		image_url_4x: string;
	}[];
}

export interface ApiEmote {
	id: string;
	name: string;
	images: {
		url_1x: string;
		url_2x: string;
		url_4x: string;
	};
	format: string[];
	scale: string[];
	theme_mode: string[];
}

export interface ApiValidate {
	client_id: string;
	login: string;
	scopes: string[];
	user_id: string;
	expires_in: number;
}
