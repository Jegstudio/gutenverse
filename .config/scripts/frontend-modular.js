const path = require("path");
const fs = require("fs");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const rules = require("gutenverse-core/.config/rules");
const { output } = require('../config');
const { stats, plugins } = require("gutenverse-core/.config/config");
const { externals, coreFrontendExternals, configDepsExtractExternals } = require("gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

const modularDir = path.resolve(__dirname, "../../src/frontend/blocks/");

const getModularConfig = () => {
    const files = fs.readdirSync(modularDir).filter(file => file.endsWith('.js'));

    const entry = {};
    const copyTasks = [];
    const deleteTasks = [];

    files.forEach(file => {
        const name = file.replace('.js', '');

        entry[name] = {
            import: path.join(modularDir, file),
        };

        deleteTasks.push(`./gutenverse/assets/js/frontend/${name}.js*`);
        deleteTasks.push(`./gutenverse/lib/dependencies/frontend/${name}.asset.php`);

        copyTasks.push({
            source: process.env.NODE_ENV === 'development' ? `./build/${name}.js*` : `./build/${name}.js`,
            destination: "./gutenverse/assets/js/frontend/",
        });

        copyTasks.push({
            source: `./build/${name}.asset.php`,
            destination: "./gutenverse/lib/dependencies/frontend/",
        });
    });

    return { entry, copyTasks, deleteTasks };
};

const { entry, copyTasks, deleteTasks } = getModularConfig();

const frontendModular = {
    mode: "development",
    devtool: "source-map",
    entry,
    externals: {
        ...externals,
        ...coreFrontendExternals,
    },
    stats,
    output,
    module: {
        strictExportPresence: true,
        rules,
    },
    plugins: [
        ...plugins,
        new DependencyExtractionWebpackPlugin(configDepsExtractExternals()),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: [
                        ...deleteTasks,
                        "./gutenverse/assets/js/frontend/chunk-shufflejs.js*",
                        "./gutenverse/assets/js/frontend/chunk-swiper.js*",
                        "./gutenverse/assets/js/frontend/chunk-swiper-modules.js*",
                        "./gutenverse/assets/js/frontend/vendors-node_modules_pnpm_swiper_*.js*",
                        "./gutenverse/assets/js/frontend/vendors-node_modules_swiper_shared_utils_mjs.js*"
                    ]
                },
                onEnd: {
                    copy: [
                        ...copyTasks,
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/chunk-shufflejs.js*" : "./build/chunk-shufflejs.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/chunk-swiper.js*" : "./build/chunk-swiper.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/vendors-node_modules_pnpm_swiper_*.js*" : "./build/vendors-node_modules_pnpm_swiper_*.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        },
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/chunk-swiper-modules.js*" : "./build/chunk-swiper-modules.js",
                            destination: "./gutenverse/assets/js/frontend/",
                        }
                    ],
                },
            },
            runTasksInSeries: true,
        }),
    ],
};

module.exports = {
    frontendModular,
};
