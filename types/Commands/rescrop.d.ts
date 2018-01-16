import { IInfoResult } from "./info";
import { ICropOptions } from "./crop";
import { IResizeOptions } from "./resize";
/**
 * Resizes and crops an image.
 *
 * @param {IResCropOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export declare function rescrop(options: IResCropOptions): Promise<IInfoResult>;
export interface IResCropOptions extends ICropOptions, IResizeOptions {
}
