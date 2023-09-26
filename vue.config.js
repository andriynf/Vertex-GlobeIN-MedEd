process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
	pages: {
		launch: 'src/_launch/main.js',
		index: 'src/main.js'
	},
	publicPath: process.env.NODE_ENV === 'production' ? `./` : '/',

	pluginOptions: {
		electronBuilder: {
			preload: 'src/preload.js',
			removeElectronJunk: true, // True by default
			builderOptions: {
				// options placed here will be merged with default configuration and passed to electron-builder
				appId: `com.example.${JSON.stringify(require('./package.json').name)}`,
				directories: {
					buildResources: 'resources'
				},
				publish: [
					{
						provider: 'generic',
						url: ''
						// url: "https://bhoward3.com/electron/app/"
					}
				],
				nsis: {
					deleteAppDataOnUninstall: true
				}
			},
			nodeIntegration: true
		}
	},

	outputDir: undefined,
	assetsDir: undefined,
	runtimeCompiler: undefined,
	productionSourceMap: false,
	parallel: undefined,
	css: undefined
};
