import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { revoke, validate } from '../services/oauth';

export const initialState = {
	username: '',
	userId: '',
	isAuthenticated: false,
	isLoadingValidate: false,
	isLoadingRevoke: false,
};

export const validateToken = createAsyncThunk(
	'auth/validate',
	async (__, { getState }) => {
		const { token } = getState().auth;
		if (token) {
			const response = validate(token);
			return response;
		}
		throw new Error('No token');
	}
);

export const revokeToken = createAsyncThunk(
	'auth/revoke',
	async (__, { getState }) => {
		const { token } = getState().auth;
		if (token) {
			const response = revoke(token);
			return response;
		}
		throw new Error('No token');
	}
);

export const authSlice = createSlice({
	name: 'auth',
	initialState: { ...initialState },
	reducers: {
		setAuth: (state, action) => {
			state.token = action.payload.token;
		},
		clearAuth: (state) => {
			state.username = '';
			state.userId = '';
			state.token = '';
		},
	},
	extraReducers: {
		[validateToken.fulfilled]: (state, action) => {
			state.isAuthenticated = true;
			state.isLoadingValidate = false;
			state.userId = action.payload.user_id;
			state.username = action.payload.login;
		},
		[validateToken.rejected]: (state) => {
			state.isAuthenticated = false;
			state.isLoadingValidate = false;
			state.username = '';
			state.userId = '';
			state.token = '';
		},
		[validateToken.pending]: (state) => {
			state.isLoadingValidate = true;
		},

		[revokeToken.fulfilled]: (state) => {
			state.isAuthenticated = false;
			state.isLoadingRevoke = false;
			state.username = '';
			state.userId = '';
			state.token = '';
		},
		[revokeToken.rejected]: (state) => {
			state.isAuthenticated = false;
			state.isLoadingRevoke = false;
			state.username = '';
			state.userId = '';
			state.token = '';
		},
		[revokeToken.pending]: (state) => {
			state.isLoadingRevoke = true;
		},
	},
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
