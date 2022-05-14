import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	messages: [],
	messagesList: [],
};

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(action.payload);
			state.messagesList.push(action.payload);
		},
		deleteMessage: (state, action) => {
			const removeIndex = state.messages
				.map((item) => item.tags.id)
				.indexOf(action.payload.userstate['target-msg-id']);
			state.messages.splice(removeIndex, 1);
		},
	},
});

export const { addMessage, deleteMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
