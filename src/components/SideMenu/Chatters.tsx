import React, { useEffect, useState, memo } from 'react';
import '@scss/Chatters.scss';
import ChattersList from './ChattersList';
import { useAppSelector } from 'hooks/reduxHooks';

const Chatters = () => {
	const globalBadges = useAppSelector((state) => state.twitch.globalBadges);
	const chatterList = useAppSelector((state) => state.twitch.chatters);
	const [moderators, setModerators] = useState<string[]>([]);
	const [vips, setVips] = useState<string[]>([]);
	const [subscribers, setSubscribers] = useState<string[]>([]);
	const [filteredSubscribers, setFilteredSubscribers] = useState<string[]>([]);
	const [chatters, setChatters] = useState<string[]>([]);
	const [lurker, setLurker] = useState<string[]>([]);

	useEffect(() => {
		const modPrep: string[] = [];
		const vipPrep: string[] = [];
		const subPrep: string[] = [];
		const chatterPrep: string[] = [];
		const lurkerPrep: string[] = [];
		Object.keys(chatterList).forEach((chatter) => {
			if (chatterList[chatter].mod) {
				modPrep.push(
					chatterList[chatter].displayName || chatterList[chatter].username
				);
			} else if (chatterList[chatter].vip) {
				vipPrep.push(
					chatterList[chatter].displayName || chatterList[chatter].username
				);
			} else if (chatterList[chatter].subscriber) {
				subPrep.push(
					chatterList[chatter].displayName || chatterList[chatter].username
				);
			} else if (!chatterList[chatter].isLurker) {
				chatterPrep.push(
					chatterList[chatter].displayName || chatterList[chatter].username
				);
			} else {
				lurkerPrep.push(chatterList[chatter].username);
			}
		});

		const filteredSubs = subPrep
			.filter((el) => !vipPrep.includes(el))
			.filter((el) => !modPrep.includes(el));

		setModerators(modPrep);
		setVips(vipPrep);
		setSubscribers(subPrep);
		setChatters(chatterPrep);
		setLurker(lurkerPrep);
		setFilteredSubscribers(filteredSubs);
	}, [chatterList]);

	return (
		<div className="chatters">
			<div className="chatters__header">In Channel</div>
			<div className="chatters__body">
				<div className="chatters__body__chatters">
					{/* {getModeratorsList()} */}
					{moderators.length > 0 && (
						<ChattersList
							users={moderators}
							subscribers={subscribers}
							category="mod"
							badges={globalBadges}
						/>
					)}
					{vips.length > 0 && (
						<ChattersList
							users={vips}
							subscribers={subscribers}
							category="vip"
							badges={globalBadges}
						/>
					)}
					{filteredSubscribers.length > 0 && (
						<ChattersList
							users={filteredSubscribers}
							category="subscriber"
							badges={globalBadges}
						/>
					)}
					{chatters.length > 0 && (
						<ChattersList
							users={chatters}
							subscribers={subscribers}
							category="chatter"
							badges={globalBadges}
						/>
					)}
					{lurker.length > 0 && (
						<ChattersList users={lurker} badges={globalBadges} />
					)}
				</div>
			</div>
		</div>
	);
};

export default memo(Chatters);
