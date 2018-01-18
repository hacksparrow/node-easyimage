import { IBaseOptions } from "../options";
import { IInfoResult } from "./info";
/**
 * Creates a thumbnail of an image.
 *
 * @param {IThumbnailOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export declare function thumbnail(options: IThumbnailOptions): Promise<IInfoResult>;
export interface IThumbnailOptions extends IBaseOptions {
    /**
     * Height of thumbnail.
     */
    height: number;
    /**
     * Width of thumbnail.
     */
    width: number;
    /**
     * Gravity for sizing.
     * @see https://www.imagemagick.org/script/command-line-options.php#gravity
     */
    gravity?: string;
    /**
     * X offset for thumbnail.
     */
    x?: number;
    /**
     * Y offset for thumbnail.
     */
    y?: number;
    /**
     * Interpolate the thumbnail.
     */
    interpolate?: string;
}
