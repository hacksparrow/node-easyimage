import { IBaseOptions } from "../Options";
import { IInfoResult } from "./info";
/**
 * Creates a thumbnail of an image.
 *
 * @param {IThumbnailOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export declare function thumbnail(options: IThumbnailOptions): Promise<IInfoResult>;
export interface IThumbnailOptions extends IBaseOptions {
    height: number;
    width: number;
    gravity?: string;
    x?: number;
    y?: number;
    interpolate?: string;
}
