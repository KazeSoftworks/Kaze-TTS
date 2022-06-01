import React from 'react';
import { useSelector } from 'react-redux';
import {
	TYPE_BROADCASTER,
	TYPE_CHAT,
	TYPE_MODERATOR,
	TYPE_SUBSCRIBER,
	TYPE_VIP,
	TYPE_LURKER,
} from '@utils/constants';
import ChatterBadge from '@assets/Chatter Badge.svg';
import LurkerBadge from '@assets/Lurker Badge.svg';
import PropTypes from 'prop-types';

const BadgeComponent = ({ type, className }) => {
	const renderBadge = () => {
		const badges = useSelector((state) => state.twitch.globalBadges);
		if (!badges && (type !== TYPE_CHAT || type !== TYPE_LURKER)) {
			return null;
		}
		switch (type) {
			case TYPE_BROADCASTER:
				return (
					<img
						src={badges.broadcaster[1]}
						className={className}
						alt="Broadcaster badge"
					/>
				);
			case TYPE_MODERATOR:
				return (
					<img
						src={badges.moderator[1]}
						className={className}
						alt="Moderator badge"
					/>
				);
			case TYPE_SUBSCRIBER:
				return (
					<img
						src={badges.subscriber[0]}
						className={className}
						alt="Subscriber badge"
					/>
				);
			case TYPE_VIP:
				return (
					<img src={badges.vip[1]} className={className} alt="Vip badge" />
				);
			case TYPE_CHAT:
				return (
					<img src={ChatterBadge} className={className} alt="Chatter badge" />
				);
			case TYPE_LURKER:
				return (
					<img src={LurkerBadge} className={className} alt="Lurker badge" />
				);
			default:
				break;
		}
		return null;
	};
	return renderBadge();
};

BadgeComponent.propTypes = {
	type: PropTypes.string.isRequired,
	className: PropTypes.string,
};

BadgeComponent.defaultProps = {
	className: '',
};

export default BadgeComponent;
