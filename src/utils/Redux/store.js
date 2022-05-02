import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import messagesReducer from './messagesSlice';

const store = configureStore({
	reducer: {
		messages: messagesReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
