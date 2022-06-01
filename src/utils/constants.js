const AUTH_URL = 'https://id.twitch.tv/oauth2/authorize';
export const VALIDATE_URI = 'https://id.twitch.tv/oauth2/validate';
const RESPONSE_TYPE = 'response_type=token';
const CLIENT_ID_URI = `client_id=${process.env.REACT_APP_CLIENT_ID}`;
const REDIRECT_URI = 'redirect_uri=http://localhost:4000/twitch';
const SCOPE = 'scope=chat:read';
export const AUTH_URI = `${AUTH_URL}?${RESPONSE_TYPE}&${CLIENT_ID_URI}&${REDIRECT_URI}&${SCOPE}`;

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const ID_API = 'https://id.twitch.tv/oauth2/';
export const API = 'https://api.twitch.tv/helix/';

export const BTTV_API = 'https://api.betterttv.net/3/cached/';

export const PATH_HOME = '/';
export const PATH_TWITCH = '/twitch';
export const PATH_SETTINGS = '/settings';
export const PATH_SETTINGS_FILTER = `${PATH_SETTINGS}/filter`;

export const TYPE_BROADCASTER = 'broadcaster';
export const TYPE_MODERATOR = 'moderator';
export const TYPE_SUBSCRIBER = 'subscriber';
export const TYPE_VIP = 'vip';
export const TYPE_CHAT = 'chat';
export const TYPE_LURKER = 'lurker';
