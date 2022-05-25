import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ChatterBadge from '@assets/Chatter Badge.svg';
import LurkerBadge from '@assets/Lurker Badge.svg';
import '@scss/ChattersList.scss';

const ChattersList = ({ users, subscribers, category, badges }) => {
	const renderChatters = () => {
		return users.map((chatter) => {
			return (
				<li key={`chatter-${chatter}`}>
					{badges &&
						category !== 'subscriber' &&
						subscribers.includes(chatter) && (
							<img src={badges.subscriber[0]} alt="Subscriber badge" />
						)}
					{chatter}
				</li>
			);
		});
	};

	const getCategoryTitle = () => {
		switch (category) {
			case 'mod':
				return (
					badges &&
					badges.moderator && (
						<>
							<img src={badges.moderator[1]} alt="Moderator badge" />
							<span>Moderator</span>
						</>
					)
				);
			case 'vip':
				return (
					badges &&
					badges.vip && (
						<>
							<img src={badges.vip[1]} alt="Vip badge" /> <span>VIP</span>
						</>
					)
				);
			case 'subscriber':
				return (
					badges &&
					badges.subscriber && (
						<>
							<img src={badges.subscriber[0]} alt="Subscriber badge" />
							<span>Subscriber</span>
						</>
					)
				);
			case 'chatter':
				return (
					<>
						<img src={ChatterBadge} alt="Chatter badge" />
						<span>Chatter</span>
					</>
				);
			default:
				return (
					<>
						<img src={LurkerBadge} alt="Lurker badge" />
						<span>Lurker</span>
					</>
				);
		}
	};

	const getClassname = () => {
		switch (category) {
			case 'mod':
				return 'chatters-list--mod';
			case 'vip':
				return 'chatters-list--vip';
			case 'subscriber':
				return 'chatters-list--sub';
			default:
				return '';
		}
	};

	return (
		<div className={`chatters-list ${getClassname()}`}>
			<div className="chatters-list__title">{getCategoryTitle()}</div>
			<ul className="chatters-list__list">{renderChatters()}</ul>
		</div>
	);
};

export default memo(ChattersList);

ChattersList.propTypes = {
	users: PropTypes.arrayOf(PropTypes.string).isRequired,
	subscribers: PropTypes.arrayOf(PropTypes.string),
	category: PropTypes.oneOf(['mod', 'vip', 'subscriber', 'chatter', 'lurker']),
	badges: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
};

ChattersList.defaultProps = {
	badges: null,
	category: 'lurker',
	subscribers: [],
};
