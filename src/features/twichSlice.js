import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getFollowers,
	getUser,
	getGlobalChatBadges,
	getChatBadges,
} from '@services/api';
import convertBadgeResponse from '@utils/badgeHandler';

const initialState = {
	isLoadingUserInfo: false,
	isLoadingFollowers: false,
	isLoadingGlobalBadges: false,
	isLoadingChatBadges: false,
	displayName: '',
	profileImageUrl: '',
	followers: null,
	globalBadges: null,
	chatBadges: null,
	chatters: null,
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

export const getGlobalChatBadgesInfo = createAsyncThunk(
	'twitch/getGlobalBadgesInfo',
	async (__, { getState }) => {
		const { token } = getState().auth;
		if (token) {
			const response = getGlobalChatBadges(token);
			return response;
		}
		throw new Error('No token');
	}
);

export const getChatBadgesInfo = createAsyncThunk(
	'twitch/getChatBadgesInfo',
	async (__, { getState }) => {
		const { token, userId } = getState().auth;
		if (token) {
			const response = getChatBadges(token, userId);
			return response;
		}
		throw new Error('No token');
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

		[getGlobalChatBadgesInfo.fulfilled]: (state, action) => {
			state.isLoadingGlobalBadges = false;
			state.globalBadges = convertBadgeResponse(action.payload);
		},
		[getGlobalChatBadgesInfo.rejected]: (state, action) => {
			state.isLoadingGlobalBadges = false;
			console.error(action.payload);
		},
		[getGlobalChatBadgesInfo.pending]: (state) => {
			state.isLoadingGlobalBadges = true;
		},

		[getChatBadgesInfo.fulfilled]: (state, action) => {
			state.isLoadingChatBadges = false;
			state.chatBadges = convertBadgeResponse(action.payload);
		},
		[getChatBadgesInfo.rejected]: (state, action) => {
			state.isLoadingChatBadges = false;
			console.error(action.payload);
		},
		[getChatBadgesInfo.pending]: (state) => {
			state.isLoadingChatBadges = true;
		},
	},
});

export default twitchSlice.reducer;
