import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	getFollowers,
	getUser,
	getGlobalChatBadges,
	getChatBadges,
} from '@services/api';
import convertBadgeResponse from '@utils/badgeHandler';
import { ApiBadges, User } from 'twitch';
import { Badge, Chatters } from 'types';
import { RootState } from './store';

interface TwitchSliceState {
	isLoadingUserInfo: boolean;
	isLoadingFollowers: boolean;
	isLoadingGlobalBadges: boolean;
	isLoadingChatBadges: boolean;
	isLoadingChat: boolean;

	displayName: string;
	profileImageUrl: string;
	followers: number | null;
	globalBadges: Badge | null;
	chatBadges: Badge | null;

	error: string[];
	chatters: Chatters;
}

const initialState: TwitchSliceState = {
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

export const getUserInfo = createAsyncThunk<User, void, { state: RootState }>(
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

export const getFollowersInfo = createAsyncThunk<
	number,
	void,
	{ state: RootState }
>('twitch/getFollowersInfo', async (__, { getState }) => {
	const { token, userId } = getState().auth;
	if (token) {
		const response = getFollowers(token, userId);
		return response;
	}
	throw new Error('No token');
});

export const getGlobalChatBadgesInfo = createAsyncThunk<
	ApiBadges[],
	void,
	{ state: RootState }
>('twitch/getGlobalBadgesInfo', async (__, { getState }) => {
	const { token } = getState().auth;
	if (token) {
		const response = getGlobalChatBadges(token);
		return response;
	}
	throw new Error('No token');
});

export const getChatBadgesInfo = createAsyncThunk<
	ApiBadges[],
	void,
	{ state: RootState }
>('twitch/getChatBadgesInfo', async (__, { getState }) => {
	const { token, userId } = getState().auth;
	if (token) {
		const response = getChatBadges(token, userId);
		return response;
	}
	throw new Error('No token');
});

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
	extraReducers: (builder) => {
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			state.isLoadingUserInfo = false;
			state.displayName = action.payload.display_name;
			state.profileImageUrl = action.payload.profile_image_url;
		});
		builder.addCase(getUserInfo.rejected, (state, action) => {
			state.isLoadingUserInfo = false;
			console.error(action.payload);
		});
		builder.addCase(getUserInfo.pending, (state) => {
			state.isLoadingUserInfo = true;
		});

		builder.addCase(getFollowersInfo.fulfilled, (state, action) => {
			state.isLoadingFollowers = false;
			state.followers = action.payload;
		});
		builder.addCase(getFollowersInfo.rejected, (state, action) => {
			state.isLoadingFollowers = false;
			console.error(action.payload);
		});
		builder.addCase(getFollowersInfo.pending, (state) => {
			state.isLoadingFollowers = true;
		});

		builder.addCase(getGlobalChatBadgesInfo.fulfilled, (state, action) => {
			state.isLoadingGlobalBadges = false;
			state.globalBadges = convertBadgeResponse(action.payload);
		});
		builder.addCase(getGlobalChatBadgesInfo.rejected, (state, action) => {
			state.isLoadingGlobalBadges = false;
			console.error(action.payload);
		});
		builder.addCase(getGlobalChatBadgesInfo.pending, (state) => {
			state.isLoadingGlobalBadges = true;
		});

		builder.addCase(getChatBadgesInfo.fulfilled, (state, action) => {
			state.isLoadingChatBadges = false;
			state.chatBadges = convertBadgeResponse(action.payload);
		});
		builder.addCase(getChatBadgesInfo.rejected, (state, action) => {
			state.isLoadingChatBadges = false;
			console.error(action.payload);
		});
		builder.addCase(getChatBadgesInfo.pending, (state) => {
			state.isLoadingChatBadges = true;
		});
	},
});
export const { addChatter, removeChatter, setLoadingChat } =
	twitchSlice.actions;
export default twitchSlice.reducer;
