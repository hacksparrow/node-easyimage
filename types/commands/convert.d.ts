import { IBaseOptions } from "../options";
import { IInfoResult } from "./info";
/**
 * Converts an image from one format to another.
 *
 * @param {IConvertOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export declare function convert(options: IConvertOptions): Promise<IInfoResult>;
export interface IConvertOptions extends IBaseOptions {
}
