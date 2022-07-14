import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseTwitchMessage } from '@utils/messageHandler';
import { getGlobalEmotes } from '@services/api';
import { getGlobalBTTVEmotes, getChannelBttvEmotes } from '@services/bttvApi';
import {
	parseTwitchEmote,
	parseBttvEmote,
	parseChannelBttvEmote,
} from '@utils/emoteHandler';
import { Emote, MessageType } from 'types';
import { RootState } from './store';
import { ApiEmote } from 'twitch';
import { BTTVChannelEmoteRequest } from 'bttv';

interface MessagesSliceState {
	isLoadingGlobalEmotes: boolean;
	isLoadingGlobalBTTVEmotes: boolean;
	isLoadingChannelBttvEmotes: boolean;

	globalEmotes: Emote | null;
	bttvEmotes: Emote | null;
	bttvChannelEmotes: Emote | null;

	messages: MessageType[];
	ttsMessages: MessageType[];
}

const initialState: MessagesSliceState = {
	isLoadingGlobalEmotes: false,
	isLoadingGlobalBTTVEmotes: false,
	isLoadingChannelBttvEmotes: false,

	globalEmotes: null,
	bttvEmotes: null,
	bttvChannelEmotes: null,

	messages: [],
	ttsMessages: [],
};

export const getGlobalEmotesInfo = createAsyncThunk<
	ApiEmote[],
	void,
	{ state: RootState }
>('messages/getGlobalEmotes', async (__, { getState }) => {
	const { token } = getState().auth;
	if (token) {
		const response = getGlobalEmotes(token);
		return response;
	}
	throw new Error('No token');
});

export const getGlobalBTTVEmotesInfo = createAsyncThunk(
	'messages/getGlobalBTTVEmotes',
	async () => {
		const response = await getGlobalBTTVEmotes();
		return response;
	}
);

export const getChannelBttvEmotesInfo = createAsyncThunk<
	BTTVChannelEmoteRequest,
	void,
	{ state: RootState }
>('messages/getChannelBttvEmotes', async (__, { getState }) => {
	const { userId } = getState().auth;
	if (userId) {
		const response = await getChannelBttvEmotes(userId);
		return response;
	}
	throw new Error('No userId');
});

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
		},
		deleteMessage: (state, action) => {
			const removeIndex = state.messages
				.map((item) => item.id)
				.indexOf(action.payload.userstate['target-msg-id']);
			state.messages.splice(removeIndex, 1);
		},
		addTTSMessage: (state, action) => {
			state.ttsMessages.push(
				parseTwitchMessage(action.payload, {
					...state.bttvEmotes,
					...state.bttvChannelEmotes,
				})
			);
		},
		shiftTTSMessage: (state) => {
			state.ttsMessages.shift();
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getGlobalEmotesInfo.fulfilled, (state, action) => {
			state.isLoadingGlobalEmotes = false;
			state.globalEmotes = parseTwitchEmote(action.payload);
		});

		builder.addCase(getGlobalEmotesInfo.rejected, (state, action) => {
			state.isLoadingGlobalEmotes = false;
			console.error(action.payload);
		});

		builder.addCase(getGlobalEmotesInfo.pending, (state) => {
			state.isLoadingGlobalEmotes = true;
		});

		builder.addCase(getGlobalBTTVEmotesInfo.fulfilled, (state, action) => {
			state.isLoadingGlobalBTTVEmotes = false;
			state.bttvEmotes = parseBttvEmote(action.payload);
		});

		builder.addCase(getGlobalBTTVEmotesInfo.rejected, (state, action) => {
			state.isLoadingGlobalBTTVEmotes = false;
			console.error(action.payload);
		});

		builder.addCase(getGlobalBTTVEmotesInfo.pending, (state) => {
			state.isLoadingGlobalBTTVEmotes = true;
		});

		builder.addCase(getChannelBttvEmotesInfo.fulfilled, (state, action) => {
			state.isLoadingChannelBttvEmotes = false;
			state.bttvChannelEmotes = parseChannelBttvEmote(action.payload);
		});

		builder.addCase(getChannelBttvEmotesInfo.rejected, (state, action) => {
			state.isLoadingChannelBttvEmotes = false;
			console.error(action.payload);
		});

		builder.addCase(getChannelBttvEmotesInfo.pending, (state) => {
			state.isLoadingChannelBttvEmotes = true;
		});
	},
});

export const { addMessage, deleteMessage, addTTSMessage, shiftTTSMessage } =
	messagesSlice.actions;
export default messagesSlice.reducer;
