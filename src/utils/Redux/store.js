import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import messagesReducer from './messagesSlice';
import authReducer from './authSlice';

const authMiddleware = (store) => (next) => (action) => {
	const result = next(action);
	if (action.type?.startsWith('auth/')) {
		const authState = store.getState().auth;
		localStorage.setItem('auth', JSON.stringify(authState));
	}
	return result;
};

const store = configureStore({
	reducer: {
		messages: messagesReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logger).concat(authMiddleware),
});

export default store;
