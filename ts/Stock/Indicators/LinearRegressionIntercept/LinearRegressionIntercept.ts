/**
 *
 *  (c) 2010-2020 Kamil Kulig
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

import type {
    LinearRegressionOptions,
    LinearRegressionParamsOptions,
    RegressionLineParametersObject
} from '../LinearRegression/LinearRegressionOptions';
import type LinearRegressionInterceptPoint from './LinearRegressionInterceptPoint';
import BaseSeries from '../../../Core/Series/Series.js';
const {
    seriesTypes: {
        sma: SMAIndicator,
        linearRegression: LinearRegressionIndicator
    }
} = BaseSeries;
import U from '../../../Core/Utilities.js';
const {
    isArray,
    extend,
    merge
} = U;

/* *
 *
 * Class
 *
 * */

/**
 * The Linear Regression Intercept series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.linearRegressionIntercept
 *
 * @augments Highcharts.Series
 */

class LinearRegressionInterceptIndicator extends LinearRegressionIndicator {
    /**
     * Linear regression intercept indicator. This series requires `linkedTo`
     * option to be set.
     *
     * @sample {highstock} stock/indicators/linear-regression-intercept
     *         Linear intercept slope indicator
     *
     * @extends      plotOptions.linearregression
     * @since        7.0.0
     * @product      highstock
     * @requires     stock/indicators/indicators
     * @requires     stock/indicators/regressions
     * @optionparent plotOptions.linearregressionintercept
     */
    public static defaultOptions: LinearRegressionParamsOptions =
    LinearRegressionIndicator.defaultOptions as LinearRegressionOptions;

    /* *
     *
     *  Properties
     *
     * */

    public data: Array<LinearRegressionInterceptPoint> = void 0 as any;
    public options: LinearRegressionOptions = void 0 as any;
    public points: Array<LinearRegressionInterceptPoint> = void 0 as any;

    /* *
     *
     *  Functions
     *
     * */

    public getEndPointY(
        lineParameters: RegressionLineParametersObject
    ): number {
        return lineParameters.intercept;
    }
}

/**
 * A linear regression intercept series. If the
 * [type](#series.linearregressionintercept.type) option is not specified, it is
 * inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.linearregressionintercept
 * @since     7.0.0
 * @product   highstock
 * @excluding dataParser,dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/regressions
 * @apioption series.linearregressionintercept
 */

/* *
 *
 *  Prototype Properties
 *
 * */
interface LinearRegressionInterceptIndicator {
    pointClass: typeof LinearRegressionInterceptPoint;
}

extend(LinearRegressionInterceptIndicator.prototype, {
    nameBase: 'Linear Regression Intercept Indicator'
});

/**
 *
 * Register
 *
 */

declare module '../../../Core/Series/SeriesType' {
    interface SeriesTypeRegistry {
        linearRegressionIntercept: typeof LinearRegressionInterceptIndicator;
    }
}

BaseSeries.registerSeriesType(
    'linearRegressionIntercept',
    LinearRegressionInterceptIndicator
);

/* *
 *
 *  Default Export
 *
 * */

export default LinearRegressionInterceptIndicator;

/**
 * A linear regression intercept series. If the
 * [type](#series.linearregressionintercept.type) option is not specified, it is
 * inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.linearregressionintercept
 * @since     7.0.0
 * @product   highstock
 * @excluding dataParser,dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/regressions
 * @apioption series.linearregressionintercept
 */

''; // to include the above in the js output
