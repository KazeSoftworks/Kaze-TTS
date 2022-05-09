import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../../services/api';

const initialState = {
	isLoadingUserInfo: false,
	displayName: '',
	profileImageUrl: '',
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
	},
});

export default twitchSlice.reducer;
