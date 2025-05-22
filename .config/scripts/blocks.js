const fs = require("fs");
const rules = require("gutenverse-core/.config/rules");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { output } = require("../config");
const { stats, plugins } = require("gutenverse-core/.config/config");
const { externals, coreExternals, coreFrontendExternals } = require("gutenverse-core/.config/externals");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

class BlockJsonCopyPlugin {
    constructor() {
        this.initialRun = true;
    }

    apply(compiler) {
        compiler.hooks.watchRun.tapAsync('BlockJsonCopyPlugin', (compilation, callback) => {
            let changedBlocks = new Set();

            const changedFiles = compilation.modifiedFiles || new Set();

            if (this.initialRun || changedFiles.size === 0) {
                const blockDirs = fs.readdirSync("./src/editor/blocks/");
                for (const dir of blockDirs) {
                    const jsonSource = `./src/editor/blocks/${dir}/block.json`;
                    if (fs.existsSync(jsonSource)) {
                        changedBlocks.add(dir);
                    }
                }
                this.initialRun = false;
            } else {
                [...changedFiles].forEach(file => {
                    const match = file.match(/src[\\/]+editor[\\/]+blocks[\\/]+([^\\/]+)/);
                    if (match) {
                        changedBlocks.add(match[1]);
                    }
                });
            }

            changedBlocks.forEach(blockName => {
                const jsonSource = `./src/editor/blocks/${blockName}/block.json`;
                const jsonDest = `./gutenverse/block/${blockName}/block.json`;

                if (fs.existsSync(jsonSource)) {
                    try {
                        if (fs.existsSync(jsonDest)) {
                            fs.unlinkSync(jsonDest);
                        }

                        fs.mkdirSync(path.dirname(jsonDest), { recursive: true });
                        fs.copyFileSync(jsonSource, jsonDest);
                        console.log(`Updating block.json: \x1b[31m${blockName}\x1b[0m`);
                    } catch (err) {
                        console.error(`Error copying block.json for ${blockName}:`, err);
                    }
                }
            });

            callback();
        });
    }
}


const blocks = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        blocks: {
            import: path.resolve(__dirname, "../../src/editor/index.js"),
        },
    },
    externals: {
        ...externals,
        ...coreExternals,
        ...coreFrontendExternals
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
                        "./gutenverse/assets/js/blocks.js*",
                        "./gutenverse/lib/dependencies/blocks.asset.php"
                    ]
                },
                onEnd: {
                    copy: [
                        {
                            source: process.env.NODE_ENV === 'development' ? "./build/blocks.js*" : "./build/blocks.js",
                            destination: "./gutenverse/assets/js/",
                        },
                        {
                            source: "./build/blocks.asset.php",
                            destination: "./gutenverse/lib/dependencies/",
                        },
                    ],
                },
            },
            runTasksInSeries: true,
        }),
        new BlockJsonCopyPlugin(),
    ],
};

module.exports = {
    blocks,
};
