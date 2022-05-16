import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFollowers, getUser } from '@services/api';

const initialState = {
	isLoadingUserInfo: false,
	isLoadingFollowers: false,
	displayName: '',
	profileImageUrl: '',
	followers: null,
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
	},
});

export default twitchSlice.reducer;
