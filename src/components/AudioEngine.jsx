import {
	setGeneralVoiceIndex,
	setGeneralVoicePitch,
	setGeneralVoiceRate,
	setVoices,
} from '@features/settingsSlice';
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
		if (audioEnabled) {
			const voice = localVoiceList[generalVoiceIndex];
			console.log(localVoiceList);
			speak(
				'Che, el kumako argento version femenino, igual le llamo femkumako, o femako, o fernet, ya que somos argentinos. Podemos tener muchas copas, pero nunca las malvinas',
				voice,
				1,
				1,
				1
			);
		}
	}, [audioEnabled]);

	return <div />;
};

export default memo(AudioEngine);
