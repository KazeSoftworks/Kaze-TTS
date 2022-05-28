import { setGeneralVoiceIndex } from '@features/settingsSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const VoiceSettings = () => {
	const voices = useSelector((state) => state.settings.voices);
	const generalVoiceIndex = useSelector(
		(state) => state.settings.generalVoiceIndex
	);
	const dispatch = useDispatch();

	const handleVoiceChange = (e) => {
		dispatch(setGeneralVoiceIndex(e.target.value));
	};

	return (
		<div>
			<h1>VoiceSettings</h1>
			<select value={generalVoiceIndex || ''} onChange={handleVoiceChange}>
				{voices.map((option, index) => (
					<option key={`general-voice-${option.name}`} value={index}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default VoiceSettings;
