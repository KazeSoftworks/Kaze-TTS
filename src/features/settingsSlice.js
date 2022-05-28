import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	audioEnabled: false,
	voices: [],
	generalVoiceIndex: null,
	generalVoicePitch: 1,
	generalVoiceRate: 1,
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
	},
});

export const {
	setAudioEnabled,
	setVoices,
	setGeneralVoiceIndex,
	setGeneralVoicePitch,
	setGeneralVoiceRate,
} = settingsSlice.actions;
export default settingsSlice.reducer;
