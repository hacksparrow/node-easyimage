import { IBaseOptions } from "../options";
import { IInfoResult } from "./info";
/**
 * Crops an image.
 *
 * @param {ICropOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export declare function crop(options: ICropOptions): Promise<IInfoResult>;
export interface ICropOptions extends IBaseOptions {
    /**
     * Width of cropped image.
     */
    cropWidth: number;
    /**
     * Height of cropped image.
     * @default cropWidth
     */
    cropHeight?: number;
    /**
     * Width of cropped image.
     * @deprecated
     */
    cropwidth?: number;
    /**
     * Height of cropped image.
     * @deprecated
     */
    cropheight?: number;
    /**
     * Gravity for crop.
     * @see https://www.imagemagick.org/script/command-line-options.php#gravity
     */
    gravity?: string;
    /**
     * Left distance of crop
     * @default 0
     */
    x?: number;
    /**
     * Top distance of crop
     * @default 0
     */
    y?: number;
}
