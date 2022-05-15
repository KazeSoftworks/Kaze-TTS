import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFollowers, getGlobalEmotes, getUser } from '@services/api';
import getGlobalBTTVEmotes from '@services/bttvApi';
import { parseBbtvEmote, parseTwitchEmote } from 'utils/emoteHandler';

const initialState = {
	isLoadingUserInfo: false,
	isLoadingFollowers: false,
	isLoadingGlobalEmotes: false,
	isLoadingGlobalBTTVEmotes: false,
	displayName: '',
	profileImageUrl: '',
	followers: null,
	globalEmotes: null,
	bttvEmotes: null,
	error: [],
};

export const getUserInfo = createAsyncThunk(
	'twitch/getUserInfo',
	async (__, { getState }) => {
		const { token, userId } = getState().auth;
		if (token) {
			const response = getUser(token, userId);
			return response;
		}
		throw new Error('No token');
	}
);

export const getFollowersInfo = createAsyncThunk(
	'twitch/getFollowersInfo',
	async (__, { getState }) => {
		const { token, userId } = getState().auth;
		if (token) {
			const response = getFollowers(token, userId);
			return response;
		}
		throw new Error('No token');
	}
);

export const getGlobalEmotesInfo = createAsyncThunk(
	'twitch/getGlobalEmotes',
	async (__, { getState }) => {
		const { token } = getState().auth;
		if (token) {
			const response = getGlobalEmotes(token);
			return response;
		}
		throw new Error('No token');
	}
);

export const getGlobalBTTVEmotesInfo = createAsyncThunk(
	'twitch/getGlobalBTTVEmotes',
	async () => {
		const response = await getGlobalBTTVEmotes();
		return response;
	}
);

export const twitchSlice = createSlice({
	name: 'twitch',
	initialState,
	extraReducers: {
		[getUserInfo.fulfilled]: (state, action) => {
			state.isLoadingUserInfo = false;
			state.displayName = action.payload.display_name;
			state.profileImageUrl = action.payload.profile_image_url;
		},
		[getUserInfo.rejected]: (state, action) => {
			state.isLoadingUserInfo = false;
			console.error(action.payload);
		},
		[getUserInfo.pending]: (state) => {
			state.isLoadingUserInfo = true;
		},

		[getFollowersInfo.fulfilled]: (state, action) => {
			state.isLoadingFollowers = false;
			state.followers = action.payload;
		},
		[getFollowersInfo.rejected]: (state, action) => {
			state.isLoadingFollowers = false;
			console.error(action.payload);
		},
		[getFollowersInfo.pending]: (state) => {
			state.isLoadingFollowers = true;
		},

		[getGlobalEmotesInfo.fulfilled]: (state, action) => {
			state.isLoadingGlobalEmotes = false;
			state.globalEmotes = parseTwitchEmote(action.payload);
		},
		[getGlobalEmotesInfo.rejected]: (state, action) => {
			state.isLoadingGlobalEmotes = false;
			console.error(action.payload);
		},
		[getGlobalEmotesInfo.pending]: (state) => {
			state.isLoadingGlobalEmotes = true;
		},

		[getGlobalBTTVEmotesInfo.fulfilled]: (state, action) => {
			state.isLoadingGlobalBTTVEmotes = false;
			state.bttvEmotes = parseBbtvEmote(action.payload);
		},
		[getGlobalBTTVEmotesInfo.rejected]: (state, action) => {
			state.isLoadingGlobalBTTVEmotes = false;
			console.error(action.payload);
		},
		[getGlobalBTTVEmotesInfo.pending]: (state) => {
			state.isLoadingGlobalBTTVEmotes = true;
		},
	},
});

export default twitchSlice.reducer;
