import {
	setGeneralVoiceIndex,
	setGeneralVoicePitch,
	setGeneralVoiceRate,
	setVoices,
} from '@features/settingsSlice';
import { shiftTTSMessage } from '@features/messagesSlice';
import React, { useEffect, useState, memo } from 'react';
import store from '@features/store';
import { useAppSelector, useAppDispatch } from '@hooks/reduxHooks';

const AudioEngine = () => {
	const synth = window.speechSynthesis;
	const dispatch = useAppDispatch();
	const generalVoiceIndex = useAppSelector(
		(state) => state.settings.generalVoiceIndex
	);
	const [localVoiceList, setLocalVoiceList] = useState<SpeechSynthesisVoice[]>(
		[]
	);
	const audioEnabled = useAppSelector((state) => state.settings.audioEnabled);
	const ttsMessages = useAppSelector((state) => state.messages.ttsMessages);

	const speak = async (
		text: string,
		voice: SpeechSynthesisVoice,
		rate: number,
		pitch: number
	) => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = voice;
		utterance.lang = voice.lang;
		utterance.rate = rate;
		utterance.pitch = pitch;
		utterance.volume = 1;
		await new Promise((resolve) => {
			utterance.onend = resolve;
			synth.speak(utterance);
		});
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
		if (audioEnabled && ttsMessages.length > 0 && generalVoiceIndex) {
			const voice = localVoiceList[generalVoiceIndex];
			const message = ttsMessages[0];
			const messageTTS = `${message.username} dice ${message.text}`;
			dispatch(shiftTTSMessage());
			const {
				speakBroadcaster,
				speakModerator,
				speakSubscriber,
				speakVip,
				speakChat,
			} = store.getState().settings;

			console.log(
				message,
				speakBroadcaster,
				speakSubscriber,
				speakModerator,
				speakVip,
				speakChat
			);
			if (message.broadcaster) {
				if (speakBroadcaster) {
					speak(messageTTS, voice, 1, 1);
				}
			} else if (message.mod) {
				if (speakModerator) {
					speak(messageTTS, voice, 1, 1);
				}
			} else if (message.vip) {
				if (speakVip) {
					speak(messageTTS, voice, 1, 1);
				}
			} else if (message.subscriber) {
				if (speakSubscriber) {
					speak(messageTTS, voice, 1, 1);
				}
			} else if (speakChat) {
				speak(messageTTS, voice, 1, 1);
			}
		}
	}, [audioEnabled, ttsMessages]);

	return <div />;
};

export default memo(AudioEngine);
