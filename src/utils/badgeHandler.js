const convertBadgeResponse = (badgeResponse) => {
	if (badgeResponse.length === 0) {
		return null;
	}
	const badgeInfo = badgeResponse.reduce((previous, current) => {
		const id = current.set_id;
		const versions = current.versions.reduce((p, c) => {
			const imageId = c.id;
			const image = c.image_url_4x;
			return { ...p, [imageId]: image };
		}, {});
		return { ...previous, [id]: versions };
	}, {});

	return badgeInfo;
};

export default convertBadgeResponse;
