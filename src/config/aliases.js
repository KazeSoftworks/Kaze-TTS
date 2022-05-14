const aliases = (prefix = `src`) => ({
	'@components': `${prefix}/components`,
	'@container': `${prefix}/container`,
	'@features': `${prefix}/features`,
	'@routes': `${prefix}/routes`,
	'@assets': `${prefix}/assets`,
	'@scss': `${prefix}/scss`,
	'@utils': `${prefix}/utils`,
	'@services': `${prefix}/services`,
});

module.exports = aliases;
