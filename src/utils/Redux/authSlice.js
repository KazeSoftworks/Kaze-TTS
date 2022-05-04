import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	username: '',
	userId: '',
	token: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.username = action.payload.username;
			state.userId = action.payload.userId;
			state.token = action.payload.token;
		},
	},
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
