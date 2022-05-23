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
	const { globalBadges, chatters } = useSelector((state) => state.twitch);
	const dispatch = useDispatch();

	const getModeratorsList = () => {
		const moderators = [];
		const chattersList = Object.keys(chatters);
		chattersList.forEach((chatter) => {
			if (chatters[chatter].mod) {
				moderators.push(chatters[chatter]);
			}
		});
		if (moderators.length === 0) {
			return null;
		}
		return (
			<div className="chatters__body__chatters__category chatters__body__chatters__category--mod">
				<div className="chatters__body__chatters__category__title">
					{globalBadges && globalBadges.moderator && (
						<img src={globalBadges.moderator[1]} alt="Moderator badge" />
					)}
					Moderators
				</div>
				<ul className="chatters__body__chatters__category__list">
					{moderators.map((moderator) => (
						<li key={`chatter-${moderator.username}`}>
							{moderator.displayName || moderator.username}
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div className="chatters">
			<div className="chatters__header">In Channel</div>
			<div className="chatters__body">
				<div className="chatters__body__chatters">
					{getModeratorsList()}

					<div className="chatters__body__chatters__category">
						<div className="chatters__body__chatters__category__title">
							{globalBadges && globalBadges.vip && (
								<img src={globalBadges.vip[1]} alt="Vip Badge" />
							)}
							VIP
						</div>
					</div>

					<div className="chatters__body__chatters__category">
						<div className="chatters__body__chatters__category__title">
							{globalBadges && globalBadges.subscriber && (
								<img src={globalBadges.subscriber[1]} alt="Sub badge" />
							)}
							Subscriber
						</div>
					</div>

					<div className="chatters__body__chatters__category">
						<div className="chatters__body__chatters__category__title">
							<img src={ChatterBadge} alt="Chatter Badge" /> Chatters
						</div>
					</div>

					<div className="chatters__body__chatters__category">
						<div className="chatters__body__chatters__category__title">
							<img src={LurkerBadge} alt="Lurker Badge" />
							Lurker
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chatters;
