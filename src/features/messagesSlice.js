import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseTwitchMessage } from '@utils/messageHandler';
import { getGlobalEmotes } from '@services/api';
import getGlobalBTTVEmotes from '@services/bttvApi';
import { parseTwitchEmote, parseBttvEmote } from '@utils/emoteHandler';

const initialState = {
	isLoadingGlobalEmotes: false,
	isLoadingGlobalBTTVEmotes: false,
	globalEmotes: null,
	bttvEmotes: null,

	messages: [],
	messagesList: [],
};

export const getGlobalEmotesInfo = createAsyncThunk(
	'messages/getGlobalEmotes',
	async (__, { getState }) => {
		const { token } = getState().auth;
		if (token) {
			const response = getGlobalEmotes(token);
			return response;
		}
		throw new Error('No token');
	}
);

export const getGlobalBTTVEmotesInfo = createAsyncThunk(
	'messages/getGlobalBTTVEmotes',
	async () => {
		const response = await getGlobalBTTVEmotes();
		return response;
	}
);

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(parseTwitchMessage(action.payload, state.bttvEmotes));
			state.messagesList.push(action.payload);
		},
		deleteMessage: (state, action) => {
			const removeIndex = state.messages
				.map((item) => item.tags.id)
				.indexOf(action.payload.userstate['target-msg-id']);
			state.messages.splice(removeIndex, 1);
		},
	},
	extraReducers: {
		[getGlobalEmotesInfo.fulfilled]: (state, action) => {
			state.isLoadingGlobalEmotes = false;
			state.globalEmotes = parseTwitchEmote(action.payload);
		},
		[getGlobalEmotesInfo.rejected]: (state, action) => {
			state.isLoadingGlobalEmotes = false;
			console.error(action.payload);
		},
		[getGlobalEmotesInfo.pending]: (state) => {
			state.isLoadingGlobalEmotes = true;
		},

		[getGlobalBTTVEmotesInfo.fulfilled]: (state, action) => {
			state.isLoadingGlobalBTTVEmotes = false;
			state.bttvEmotes = parseBttvEmote(action.payload);
		},
		[getGlobalBTTVEmotesInfo.rejected]: (state, action) => {
			state.isLoadingGlobalBTTVEmotes = false;
			console.error(action.payload);
		},
		[getGlobalBTTVEmotesInfo.pending]: (state) => {
			state.isLoadingGlobalBTTVEmotes = true;
		},
	},
});

export const { addMessage, deleteMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
