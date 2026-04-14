const proxy = process.env.GUTENVERSE_DEV_PROXY || 'http://localhost';

module.exports = {
	proxy,
	host: 'localhost',
	port: process.env.GUTENVERSE_DEV_PORT || 3000,
	open: false,
	notify: false,
	ui: false,
	reloadDebounce: 500,
	reloadDelay: 250,
	watchEvents: ['change', 'add', 'unlink'],
	files: [
		'gutenverse/assets/css/**/*.css',
		'gutenverse/assets/js/**/*.js',
		'gutenverse/block/**/*.json',
		'gutenverse/**/*.php',
		'gutenverse-core/framework/assets/css/**/*.css',
		'gutenverse-core/framework/assets/js/**/*.js',
		'gutenverse-core/framework/block/**/*.json',
		'gutenverse-core/framework/**/*.php',
		'!**/*.map',
	],
};
