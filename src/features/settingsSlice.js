import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	audioEnabled: false,
	voices: [],
	generalVoiceIndex: null,
	generalVoicePitch: 1,
	generalVoiceRate: 1,

	speakBroadcaster: false,
	speakSubscriber: true,
	speakModerator: true,
	speakVip: true,
	speakChat: true,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setAudioEnabled: (state, action) => {
			state.audioEnabled = action.payload;
		},
		setVoices: (state, action) => {
			state.voices = action.payload;
		},
		setGeneralVoiceIndex: (state, action) => {
			state.generalVoiceIndex = Number(action.payload);
		},
		setGeneralVoicePitch: (state, action) => {
			state.generalVoicePitch = action.payload;
		},
		setGeneralVoiceRate: (state, action) => {
			state.generalVoiceRate = action.payload;
		},

		toggleSpeakBroadcaster: (state) => {
			state.speakBroadcaster = !state.speakBroadcaster;
		},
		toggleSpeakSubscriber: (state) => {
			state.speakSubscriber = !state.speakSubscriber;
		},
		toggleSpeakModerator: (state) => {
			state.speakModerator = !state.speakModerator;
		},
		toggleSpeakVip: (state) => {
			state.speakVip = !state.speakVip;
		},
		toggleSpeakChat: (state) => {
			state.speakChat = !state.speakChat;
		},
	},
});

export const {
	setAudioEnabled,
	setVoices,
	setGeneralVoiceIndex,
	setGeneralVoicePitch,
	setGeneralVoiceRate,
	toggleSpeakBroadcaster,
	toggleSpeakModerator,
	toggleSpeakSubscriber,
	toggleSpeakVip,
	toggleSpeakChat,
} = settingsSlice.actions;
export default settingsSlice.reducer;
