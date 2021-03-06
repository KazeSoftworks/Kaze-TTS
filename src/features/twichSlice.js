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
	isLoadingChat: false,
	displayName: '',
	profileImageUrl: '',
	followers: null,
	globalBadges: null,
	chatBadges: null,
	error: [],

	chatters: {},
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
	reducers: {
		addChatter: (state, action) => {
			const {
				username,
				displayName,
				broadcaster,
				mod,
				vip,
				subscriber,
				isLurker,
			} = action.payload;
			// Never add broadcaster
			if (broadcaster || username === state.displayName.toLowerCase()) {
				return;
			}
			// If user was already added to the chatters list but is added as lurker later, ignore them
			if (
				state.chatters[username] &&
				!state.chatters[username].isLurker &&
				isLurker
			) {
				return;
			}
			// If user is in list and there is no other changes on it, ignore it
			if (
				state.chatters[username] &&
				JSON.stringify(state.chatters[username]) ===
					JSON.stringify({
						username,
						displayName,
						broadcaster,
						mod,
						vip,
						subscriber,
						isLurker,
					})
			) {
				return;
			}
			Object.assign(state.chatters, {
				[username]: {
					username,
					displayName,
					broadcaster,
					mod,
					vip,
					subscriber,
					isLurker,
				},
			});
		},
		removeChatter: (state, action) => {
			delete state.chatters[action.payload];
		},
		setLoadingChat: (state, action) => {
			state.isLoadingChat = action.payload;
		},
	},
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
export const { addChatter, removeChatter, setLoadingChat } =
	twitchSlice.actions;
export default twitchSlice.reducer;
