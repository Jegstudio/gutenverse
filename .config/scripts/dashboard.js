const rules = require("gutenverse-core/.config/rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { output } = require("../config");
const { stats, plugins } = require("gutenverse-core/.config/config");
const { externals, coreExternals } = require("gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const dashboard = {
    mode: "development",
    devtool: "source-map",
    entry: {
        dashboard: {
            import: path.resolve(__dirname, "../../src/backend/dashboard/index.js"),
        },
    },
    externals: {
        ...externals,
        ...coreExternals
    },
    stats,
    output,
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin(),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        "./gutenverse/assets/js/dashboard.js*",
                        "./gutenverse/lib/dependencies/dashboard.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/dashboard.js*" : "./build/dashboard.js",
                            destination: "./gutenverse/assets/js/",
                        },
                        {
                            source: "./build/dashboard.asset.php",
                            destination: "./gutenverse/lib/dependencies/",
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};

module.exports = {
    dashboard,
};
