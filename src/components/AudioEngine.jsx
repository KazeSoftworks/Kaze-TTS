import {
	setGeneralVoiceIndex,
	setGeneralVoicePitch,
	setGeneralVoiceRate,
	setVoices,
} from '@features/settingsSlice';
import { shiftTTSMessage } from 'features/messagesSlice';
import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AudioEngine = () => {
	const synth = window.speechSynthesis;
	const dispatch = useDispatch();
	const generalVoiceIndex = useSelector(
		(state) => state.settings.generalVoiceIndex
	);
	const [localVoiceList, setLocalVoiceList] = useState([]);
	const audioEnabled = useSelector((state) => state.settings.audioEnabled);
	const ttsMessages = useSelector((state) => state.messages.ttsMessages);

	const speak = (text, voice, lang, rate, pitch) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = voice;
		utterance.lang = lang;
		utterance.rate = rate;
		utterance.pitch = pitch;
		utterance.volume = 1;
		synth.speak(utterance);
	};

	useEffect(() => {
		const voicesList = synth.getVoices();
		setLocalVoiceList(voicesList);
		dispatch(
			setVoices(
				voicesList.map((voice) => {
					const { lang, localService, name, voiceURI } = voice;
					return { lang, localService, name, voiceURI };
				})
			)
		);
		dispatch(setGeneralVoiceIndex(0));
		dispatch(setGeneralVoiceRate(1));
		dispatch(setGeneralVoicePitch(1));
	}, []);

	useEffect(() => {
		if (audioEnabled) {
			synth.resume();
		} else {
			synth.cancel();
		}
	}, [audioEnabled]);

	useEffect(() => {
		if (audioEnabled && ttsMessages.length > 0) {
			const voice = localVoiceList[generalVoiceIndex];
			const message = ttsMessages[0];
			const messageTTS = `${message.username} dice ${message.text}`;
			speak(messageTTS, voice, 1, 1, 1);
			dispatch(shiftTTSMessage());
		}
	}, [audioEnabled, ttsMessages]);

	return <div />;
};

export default memo(AudioEngine);
