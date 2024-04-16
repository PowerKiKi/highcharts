/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import type SVGPath from '../../Core/Renderer/SVG/SVGPath';
import type SymbolOptions from '../../Core/Renderer/SVG/SymbolOptions';
import type { SymbolTypeRegistry } from '../../Core/Renderer/SVG/SymbolType';


import rect from '../../Core/Renderer/SVG/Symbols.js';
import Utilities from '../../Core/Utilities.js';
/* *
 *
 *  Constants
 *
 * */

/**
 * Draw one of the handles on the side of the zoomed range in the navigator.
 * @private
 */
function navigatorHandle(
    _x: number,
    _y: number,
    width: number,
    height: number,
    options: SymbolOptions = {}
): SVGPath {
    const halfWidth = options.width ? options.width / 2 : width,
        markerPosition = Math.round(halfWidth / 3) + 0.5,
        r = Utilities.relativeLength(
            options.borderRadius || 0,
            Math.min(halfWidth * 2, height)
        );

    height = options.height || height;
    return [
        ['M', -markerPosition, 4],
        ['L', -markerPosition, height - 3],
        ['M', markerPosition - 1, 4],
        ['L', markerPosition - 1, height - 3],
        ...rect.rect(-halfWidth - 1, 0.5, halfWidth * 2 + 1, height, { r })
    ];
}

/* *
 *
 *  Default Export
 *
 * */

const NavigatorSymbols: Partial<SymbolTypeRegistry> = {
    'navigator-handle': navigatorHandle
};

export default NavigatorSymbols;
