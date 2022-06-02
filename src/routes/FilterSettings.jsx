import BadgeComponent from '@components/BadgeComponent';
import React from 'react';
import {
	TYPE_BROADCASTER,
	TYPE_CHAT,
	TYPE_MODERATOR,
	TYPE_SUBSCRIBER,
	TYPE_VIP,
} from '@utils/constants';
import '@scss/FilterSettings.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	toggleSpeakBroadcaster,
	toggleSpeakModerator,
	toggleSpeakSubscriber,
	toggleSpeakVip,
	toggleSpeakChat,
} from '@features/settingsSlice';

const FilterSettings = () => {
	const dispatch = useDispatch();
	const speakBroadcaster = useSelector(
		(state) => state.settings.speakBroadcaster
	);
	const speakModerator = useSelector((state) => state.settings.speakModerator);
	const speakSubscriber = useSelector(
		(state) => state.settings.speakSubscriber
	);
	const speakVip = useSelector((state) => state.settings.speakVip);
	const speakChat = useSelector((state) => state.settings.speakChat);

	const chatterCheckBox = (type, text, checked, onChange = () => {}) => {
		return (
			<label htmlFor={type} className="filter-settings__label">
				<input
					type="checkbox"
					id={type}
					onChange={onChange}
					checked={checked}
				/>
				<BadgeComponent className="filter-settings__emote" type={type} />
				{text}
			</label>
		);
	};

	return (
		<div>
			<h1>FilterSettings</h1>
			<form>
				<fieldset className="filter-settings__fieldset">
					<legend>Who can speak with the TTS?:</legend>
					{chatterCheckBox(
						TYPE_BROADCASTER,
						'Broadcaster',
						speakBroadcaster,
						() => dispatch(toggleSpeakBroadcaster())
					)}
					{chatterCheckBox(TYPE_MODERATOR, 'Moderator', speakModerator, () =>
						dispatch(toggleSpeakModerator())
					)}
					{chatterCheckBox(TYPE_VIP, 'Vip', speakVip, () =>
						dispatch(toggleSpeakVip())
					)}
					{chatterCheckBox(TYPE_SUBSCRIBER, 'Subscriber', speakSubscriber, () =>
						dispatch(toggleSpeakSubscriber())
					)}
					{chatterCheckBox(TYPE_CHAT, 'Chatter', speakChat, () =>
						dispatch(toggleSpeakChat())
					)}
				</fieldset>
			</form>
		</div>
	);
};

export default FilterSettings;
