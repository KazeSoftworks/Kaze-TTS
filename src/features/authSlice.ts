import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { revoke, validate } from '@services/oauth';
import { ApiValidate } from 'twitch';
import { RootState } from './store';

interface AuthSliceState {
	username: string;
	userId: string;
	token: string;
	isAuthenticated: boolean;
	isLoadingValidate: boolean;
	isLoadingRevoke: boolean;
}

export const initialState: AuthSliceState = {
	username: '',
	userId: '',
	token: '',
	isAuthenticated: false,
	isLoadingValidate: false,
	isLoadingRevoke: false,
};

export const validateToken = createAsyncThunk<
	ApiValidate,
	void,
	{ state: RootState }
>('auth/validate', async (__, { getState }) => {
	const { token } = getState().auth;
	if (token) {
		const response = validate(token);
		return response;
	}
	throw new Error('No token');
});

export const revokeToken = createAsyncThunk<void, void, { state: RootState }>(
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
	extraReducers: (builder) => {
		builder.addCase(validateToken.fulfilled, (state, action) => {
			state.isAuthenticated = true;
			state.isLoadingValidate = false;
			state.userId = action.payload.user_id;
			state.username = action.payload.login;
		});
		builder.addCase(validateToken.rejected, (state) => {
			state.isAuthenticated = false;
			state.isLoadingValidate = false;
			state.username = '';
			state.userId = '';
			state.token = '';
		});
		builder.addCase(validateToken.pending, (state) => {
			state.isLoadingValidate = true;
		});

		builder.addCase(revokeToken.fulfilled, (state) => {
			state.isAuthenticated = false;
			state.isLoadingRevoke = false;
			state.username = '';
			state.userId = '';
			state.token = '';
		});
		builder.addCase(revokeToken.rejected, (state) => {
			state.isAuthenticated = false;
			state.isLoadingValidate = false;
			state.username = '';
			state.userId = '';
			state.token = '';
		});
		builder.addCase(revokeToken.pending, (state) => {
			state.isLoadingRevoke = true;
		});
	},
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
