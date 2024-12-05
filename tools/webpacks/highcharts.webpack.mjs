/* *
 *
 *  Imports
 *
 * */


// eslint-disable-next-line node/no-unpublished-import
// import BundleDeclarationsWebpackPlugin from 'bundle-declarations-webpack-plugin';
import * as Path from 'node:path';
import FSLib from '../libs/fs.js';

import Error16Plugin from './plugins/Error16Plugin.mjs';
import ExternalsManager from './libs/ExternalsManager.mjs';
import ProductMetaPlugin from './plugins/ProductMetaPlugin.mjs';
import UMDExtensionPlugin from './plugins/UMDExtensionPlugin.mjs';


/* *
 *
 *  Constants
 *
 * */


const sourceFolder = './code/es-modules/';
const mastersFolder = Path.join(sourceFolder, 'masters');
const targetFolder = './code/';

const namespace = 'Highcharts';
const productMasters = [
    'highcharts',
    'highcharts-gantt',
    'highmaps',
    'highstock',
    'standalone-navigator'
];


const externalsManager = new ExternalsManager(
    'highcharts/highcharts',
    'highcharts',
    namespace,
    Path.join(import.meta.dirname, './externals/highcharts.json'),
    productMasters,
    sourceFolder
);


/* *
 *
 *  Distribution
 *
 * */


const webpacks = FSLib
    .getFilePaths(mastersFolder, true)
    .filter(masterFile => masterFile.endsWith('.js'))
    .map(masterFile => {
        const masterPath = Path.relative(mastersFolder, masterFile)
        const masterName = masterPath.replace(/(?:\.src)?\.js$/u, '');
        const webpackConfig = {
            // path to the main file
            entry: `./${masterFile}`,
            mode: 'production',
            optimization: {
                concatenateModules: true,
                minimize: false,
                moduleIds: 'deterministic'
            },
            output: {
                filename: `./${masterPath}`,
                globalObject: 'this',
                library: {
                    export: 'default',
                    name: (
                        productMasters.includes(masterName) ?
                            {
                                amd: `highcharts/highcharts`,
                                commonjs: `highcharts`,
                                root: namespace
                            } :
                            {
                                amd: `highcharts/${masterName}`,
                                commonjs: `highcharts/${masterName}`,
                                root: namespace
                            }
                    ),
                    type: 'umd',
                    umdNamedDefine: true
                },
                path: Path.resolve(targetFolder)
            },
            performance: {
                hints: 'error',
                maxAssetSize: 2500000,
                maxEntrypointSize: 2500000
            },
            plugins: [
                new Error16Plugin({
                    productBundles: productMasters.map(pm => `${pm}.src.js`)
                }),
                new ProductMetaPlugin({
                    productName: 'Highcharts'
                }),
                new UMDExtensionPlugin({
                    productBundles: productMasters.map(pm => `${pm}.src.js`)
                }),
                // new BundleDeclarationsWebpackPlugin.BundleDeclarationsWebpackPlugin({
                //     entry: {
                //         filePath: `./${masterFile}`.replace(/\.js$/u, '.d.ts'),
                //         output: {
                //             sortNodes: false,
                //             // dts-bundle-generator comments in output
                //             noBanner: false,
                //         }
                //     },
                //     outFile: Path.join(targetFolder, masterName) + '.d.ts',
                //     compilationOptions: {
                //         followSymlinks: false,
                //         preferredConfigPath: './ts/tsconfig.json'
                //     }
                // })
            ],
            resolve: {
                extensions: ['.js', '.ts']
            }
        };
        if (!productMasters.includes(masterName)) {
            webpackConfig.externalsType = 'umd';
            webpackConfig.externals = [function (info) {
                return externalsManager.resolveExternals(info, masterName);
            }];
        }
        return webpackConfig;
    });


/* *
 *
 *  Default Export
 *
 * */


export default webpacks;
