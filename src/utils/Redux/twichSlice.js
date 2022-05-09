import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	isLoadingValidate: false,
	isLoadingRevoke: false,
	userId: null,
};

export const twitchSlice = createSlice({
	name: 'twitch',
	initialState,
	reducers: {
		setAuthenticated: (state) => {
			state.isAuthenticated = true;
		},
		clearAuthenticated: (state) => {
			state.isAuthenticated = false;
		},
	},
});

export const { setAuthenticated } = twitchSlice.actions;
export default twitchSlice.reducer;
