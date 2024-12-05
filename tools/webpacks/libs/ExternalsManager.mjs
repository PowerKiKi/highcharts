/* *
 *
 *  Handles external UMD patterns according to configured references.
 *
 *  (c) Highsoft AS
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* *
 *
 *  Imports
 *
 * */


import * as FS from 'node:fs';
import * as Path from 'node:path';


/**
 * Creates a configuration to resolve an external reference via the given path.
 *
 * @param  {...Array<string>} pathMembers
 * Path to resolve to.
 *
 * @returns 
 * UMD configuration.
 */
function createUMDConfig(...pathMembers) {
    const commonjs = ['highcharts', ...pathMembers];
    return {
        amd: ['highcharts/highcharts', ...pathMembers],
        commonjs,
        commonjs2: commonjs,
        root: ['Highcharts', ...pathMembers]
    };
}

/* *
 *
 *  Classes
 *
 * */


export class ExternalsManager {


    /* *
     *
     *  Constructor
     *
     * */


    /**
     * @param {string} amdCorePath
     * @param {string} cjsCorePath
     * @param {string} coreNamespace
     * @param {string} externalsJSONPath
     * @param {Array<string>} productMasters
     * @param {string} sourceFolder
     */
    constructor (
        amdCorePath,
        cjsCorePath,
        coreNamespace,
        externalsJSONPath,
        productMasters,
        sourceFolder
    ) {
        this.amdCorePath = amdCorePath;
        this.cjsCorePath = cjsCorePath;
        this.coreNamespace = coreNamespace;
        this.externalNodes =
            JSON.parse(FS.readFileSync(externalsJSONPath, 'utf8'));
        this.productMasters = productMasters;
        this.sourceFolder = sourceFolder;
    }


    /* *
     *
     *  Properties
     *
     * */


    /**
     * @type {string}
     */
    amdCorePath;


    /**
     * @type {string}
     */
    cjsCorePath;


    /**
     * @type {string}
     */
    coreNamespace;


    /**
     * @type {Array<ExternalNode>}
     */
    externalNodes;


    /**
     * @type {Array<string>}
     */
    productMasters;


    /**
     * @type {string}
     */
    sourceFolder;


    /* *
     *
     *  Functions
     *
     * */


    /**
     * Creates an UMD configuration for webpack to resolve an external reference
     * via the given path.
     *
     * @param  {string} namespacePath
     * Namespace path to resolve to.
     *
     * @returns 
     * UMD configuration for webpack.
     */
    createUMDConfig(namespacePath) {
        console.log('>>>');
        const amd = namespacePath.split('.');
        const commonjs = amd.slice();
        const root = amd.slice();
        
        amd[0] = this.amdCorePath;
        commonjs[0] = this.cjsCorePath;
        root[0] = this.coreNamespace;

        return {
            amd,
            commonjs,
            commonjs2: commonjs,
            root
        };
    }

async resolveExternals(info, masterName = this.masterName) {
    // eslint-disable-next-line no-invalid-this
    const path = Path
        .relative(this.sourceFolder, Path.join(info.context, info.request))
        .replace(/(?:\.src)?\.js$/u, '')
        .replaceAll(Path.sep, Path.posix.sep);
    const name = Path.basename(path);

    // Quick exit on entry point
    if (masterName === name) {
        return void 0;
    }

    // Quick exit on standalone
    if (masterName.includes('standalone')) {
        return void 0;
    }

    // Check for product-specific additions
    switch (path) {
        case 'Core/Axis/Color/ColorAxis':
        case 'Series/ColorMapComposition':
            if (
                masterName !== 'modules/coloraxis' &&
                masterName !== 'modules/heatmap' &&
                masterName !== 'modules/map' &&
                masterName !== 'modules/sunburst' &&
                masterName !== 'modules/treemap'
            ) {
                return this.createUMDConfig('.' + name);
            }
            break;
        case 'Core/HttpUtilities':
            if (
                masterName !== 'modules/data' &&
                masterName !== 'modules/exporting'
            ) {
                return this.createUMDConfig('.' + name);
            }
            break;
        case 'Extensions/Annotations/NavigationBindings':
            if (
                masterName !== 'modules/annotations' &&
                masterName !== 'modules/annotations-advanced' &&
                masterName !== 'modules/stock-tools'
            ) {
                return this.createUMDConfig('.' + name);
            }
            break;
        case 'Extensions/DataGrouping/ApproximationRegistry':
            if (
                masterName !== 'modules/datagrouping' &&
                masterName !== 'modules/stock'
            ) {
                return this.createUMDConfig('.dataGrouping.approximations');
            }
            break;
        case 'Gantt/Pathfinder':
            if (
                masterName !== 'modules/gantt' &&
                masterName !== 'modules/pathfinder'
            ) {
                return this.createUMDConfig('.' + name);
            }
            break;
        case 'Stock/Navigator/Navigator':
        case 'Stock/Scrollbar/Scrollbar':
            if (
                masterName !== 'modules/accessibility' &&
                masterName !== 'modules/gantt' &&
                masterName !== 'modules/navigator' &&
                masterName !== 'modules/stock'
            ) {
                return this.createUMDConfig('.' + name);
            }
            break;
        case 'Stock/RangeSelector/RangeSelector':
            if (
                masterName !== 'modules/accessibility' &&
                masterName !== 'modules/gantt' &&
                masterName !== 'modules/stock'
            ) {
                return this.createUMDConfig('.' + name);
            }
            break;
        default:
            break;
    }

    // Fallback to core namespace
    switch (path) {
        case 'Core/Animation/AnimationUtilities':
        case 'Core/Defaults':
        case 'Core/Globals':
        case 'Core/Renderer/RendererUtilities':
        case 'Core/Utilities':
            return createUMDConfig();
        case 'Core/Animation/Fx':
        case 'Core/Axis/Axis':
        case 'Core/Axis/PlotLineOrBand/PlotLineOrBand':
        case 'Core/Axis/Stacking/StackItem':
        case 'Core/Axis/Tick':
        case 'Core/Chart/Chart':
        case 'Core/Color/Color':
        case 'Core/Legend/Legend':
        case 'Core/Legend/LegendSymbol':
        case 'Core/Pointer':
        case 'Core/Renderer/HTML/AST':
        case 'Core/Renderer/SVG/SVGElement':
        case 'Core/Renderer/SVG/SVGRenderer':
        case 'Core/Renderer/RendererRegistry':
        case 'Core/Series/DataLabel':
        case 'Core/Series/Point':
        case 'Core/Series/Series':
        case 'Core/Series/SeriesRegistry':
        case 'Core/Templating':
        case 'Core/Time':
        case 'Core/Tooltip':
            return createUMDConfig('.' + name);
        case 'Series/Area/AreaSeries':
            return createUMDConfig('.Series.types.area');
        case 'Series/AreaSpline/AreaSplineSeries':
            return createUMDConfig('.Series.types.areaspline');
        case 'Series/Bar/BarSeries':
            return createUMDConfig('.Series.types.bar');
        case 'Series/Column/ColumnSeries':
            return createUMDConfig('.Series.types.column');
        case 'Series/Line/LineSeries':
            return createUMDConfig('.Series.types.line');
        case 'Series/Pie/PieSeries':
            return createUMDConfig('.Series.types.pie');
        case 'Series/Scatter/ScatterSeries':
            return createUMDConfig('.Series.types.scatter');
        case 'Series/Spline/SplineSeries':
            return createUMDConfig('.Series.types.spline');
        default:
            return void 0;
    }

}

    /**
     * Resolves external references of the binded master file to specific UMD
     * paths.
     *
     * @param {*|undefined} info
     * Webpack information for resolve logic.
     *
     * @param {string} currentMasterPath
     * The current bundle path to resolve for.
     *
     * @return {*|undefined}
     * Resolved UMD configuration for external Webpack reference or `undefined`
     * for inclusion in current Webpack bundle.
     */
    resolve(info, currentMasterPath) {
        const path = Path
            .relative(this.sourceFolder, Path.join(info.context, info.request))
            .replace(/(?:\.src)?\.js$/u, '')
            .replaceAll(Path.sep, Path.posix.sep);
        const name = Path.basename(path);

        if (this.productMasters.includes(currentMasterPath)) {
            console.log('XXX', path);
            return void 0;
        }

        for (const externalNode of this.externalNodes) {
            console.log(path, externalNode.files);
            if (externalNode.files.includes(path)) {
                if (externalNode.included.includes(currentMasterPath)) {
                    return void 0;
                } else {
                    return this.createUMDConfig(
                        externalNode.namespacePath.replace(/\{name\}/gsu, name)
                    );
                }
            }
        }

        return void 0;
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default ExternalsManager;


/* *
 *
 *  Types
 *
 * */


/**
 * Definition of an external node.
 * @typedef {Object} ExternalNode
 *
 * @property {Array<string>} files
 * Source files to consider.
 *
 * @property {Array<string>} included
 * Master files that include the source files.
 *
 * @property {string} namespacePath
 * Path on the core namespace when not included.
 */
