import { IBaseOptions } from "../options";
import { IInfoResult } from "./info";
/**
 * Resizes an image.
 *
 * @param {IResizeOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export declare function resize(options: IResizeOptions): Promise<IInfoResult>;
export interface IResizeOptions extends IBaseOptions {
    /**
     * Width of resized image.
     */
    width: number;
    /**
     * Height of resized image.
     * @default cropWidth
     */
    height?: number;
    /**
     * Ignore aspect ratio when resizing.
     * @default false
     */
    ignoreAspectRatio?: boolean;
    /**
     * Only reduce the size of the image. Do not increase it.
     * @default false
     */
    onlyDownscale?: boolean;
}
