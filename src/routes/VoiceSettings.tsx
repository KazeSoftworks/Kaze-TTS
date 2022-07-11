import { setGeneralVoiceIndex } from '@features/settingsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import React, { ChangeEvent } from 'react';

const VoiceSettings = () => {
	const voices = useAppSelector((state) => state.settings.voices);
	const generalVoiceIndex = useAppSelector(
		(state) => state.settings.generalVoiceIndex
	);
	const dispatch = useAppDispatch();

	const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
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
