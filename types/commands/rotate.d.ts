import { IBaseOptions } from "../options";
import { IInfoResult } from "./info";
/**
 * Rotates an image by a specified number of degrees.
 *
 * @param {IRotateOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export declare function rotate(options: IRotateOptions): Promise<IInfoResult>;
export interface IRotateOptions extends IBaseOptions {
    /**
     * Number of degrees to rotate the image.
     */
    degree: number;
}
