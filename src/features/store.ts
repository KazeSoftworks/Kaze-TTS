import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import messagesReducer from './messagesSlice';
import authReducer, { initialState } from './authSlice';
import twitchReducer from './twichSlice';
import settingsReducer from './settingsSlice';

const authMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	if (action.type?.startsWith('auth/')) {
		const { token } = store.getState().auth;
		localStorage.setItem('auth', JSON.stringify({ token }));
	}
	return result;
};

const reHydrateStore = () => {
	if (localStorage.getItem('auth') !== null) {
		const data = JSON.parse(localStorage.getItem('auth'));
		return { auth: { ...data, ...initialState } };
	}
	return {};
};

const store = configureStore({
	reducer: {
		messages: messagesReducer,
		auth: authReducer,
		twitch: twitchReducer,
		settings: settingsReducer,
	},
	preloadedState: reHydrateStore(),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logger).concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
