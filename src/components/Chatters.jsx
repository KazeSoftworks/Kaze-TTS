import { getChattersInfo } from '@features/twichSlice';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@scss/Chatters.scss';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';
import ChatterBadge from '@assets/Chatter Badge.svg';
import LurkerBadge from '@assets/Lurker Badge.svg';

const Chatters = () => {
	const { isAuthenticated } = useSelector((state) => state.auth);
	const { globalBadges } = useSelector((state) => state.twitch);
	const dispatch = useDispatch();

	return (
		<div className="chatters">
			<div className="chatters__header">In Channel</div>
			<div className="chatters__body">
				<div className="chatters__body__chatters">
					<div className="chatters__body__chatters__category">
						{globalBadges && globalBadges.moderator && (
							<img src={globalBadges.moderator[1]} alt="Sub badge" />
						)}
						Moderators
					</div>

					<div className="chatters__body__chatters__category">
						{globalBadges && globalBadges.vip && (
							<img src={globalBadges.vip[1]} alt="Vip Badge" />
						)}
						VIP
					</div>

					<div className="chatters__body__chatters__category">
						{globalBadges && globalBadges.subscriber && (
							<img src={globalBadges.subscriber[1]} alt="Sub badge" />
						)}
						Subscriber
					</div>

					<div className="chatters__body__chatters__category">
						<img src={ChatterBadge} alt="Chatter Badge" /> Chatters
					</div>

					<div className="chatters__body__chatters__category">
						<img src={LurkerBadge} alt="Lurker Badge" />
						Lurker
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chatters;
