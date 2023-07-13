const rules = require("gutenverse-core/.config/rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { output } = require("../config");
const { stats, plugins } = require("gutenverse-core/.config/config");
const { externals } = require("gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

const wizard = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        wizard: {
            import: path.resolve(__dirname, "../../src/backend/wizard/index.js"),
        },
    },
    externals: {
        ...externals,
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
                onEnd: {
                    copy: [
                        {
                            source: "./build/wizard.js",
                            destination: "./gutenverse/assets/js/",
                        },
                        {
                            source: "./build/wizard.asset.php",
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
    wizard,
};
