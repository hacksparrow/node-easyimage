/**
 * Returns information about an image.
 *
 * @param {string} filePath Path to the image file.
 * @returns {Bluebird<IInfoResult>}
 */
export declare function info(filePath: string): Promise<IInfoResult>;
export interface IInfoResult {
    /**
     * Type of file.
     */
    type: string;
    /**
     * The number of bits in a color sample within a pixel.
     */
    depth: number;
    /**
     * The width of the image.
     */
    width: number;
    /**
     * The height of the image.
     */
    height: number;
    /**
     * The filesize of the image in bytes.
     */
    size: number;
    /**
     * The density of the image.
     */
    density: IDensity;
    /**
     * The filename (excluding the path) of the image.
     */
    name: string;
    /**
     * The path to the image.
     */
    path: string;
    /**
     * Orientation of the image.
     */
    orientation: string;
    /**
     * Number of frames in image.
     */
    frames: number;
    /**
     * Any warnings that ImageMagick may have output.
     */
    warnings?: string;
}
export interface IDensity {
    x: number;
    y: number;
}
