import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseTwitchMessage } from '@utils/messageHandler';
import { getGlobalEmotes } from '@services/api';
import { getGlobalBTTVEmotes, getChannelBttvEmotes } from '@services/bttvApi';
import {
	parseTwitchEmote,
	parseBttvEmote,
	parseChannelBttvEmote,
} from '@utils/emoteHandler';

const initialState = {
	isLoadingGlobalEmotes: false,
	isLoadingGlobalBTTVEmotes: false,
	isLoadingChannelBttvEmotes: false,

	globalEmotes: null,
	bttvEmotes: null,
	bttvChannelEmotes: null,

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

export const getChannelBttvEmotesInfo = createAsyncThunk(
	'messages/getChannelBttvEmotes',
	async (__, { getState }) => {
		const { userId } = getState().auth;
		if (userId) {
			const response = await getChannelBttvEmotes(userId);
			return response;
		}
		throw new Error('No userId');
	}
);

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(
				parseTwitchMessage(action.payload, {
					...state.bttvEmotes,
					...state.bttvChannelEmotes,
				})
			);
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

		[getChannelBttvEmotesInfo.fulfilled]: (state, action) => {
			state.isLoadingChannelBttvEmotes = false;
			state.bttvChannelEmotes = parseChannelBttvEmote(action.payload);
		},
		[getChannelBttvEmotesInfo.rejected]: (state, action) => {
			state.isLoadingChannelBttvEmotes = false;
			console.error(action.payload);
		},
		[getChannelBttvEmotesInfo.pending]: (state) => {
			state.isLoadingChannelBttvEmotes = true;
		},
	},
});

export const { addMessage, deleteMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
