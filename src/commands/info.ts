/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */

import * as Bluebird from "bluebird";
import {execute} from "../execute";
import {UnsupportedError} from "../errors/UnsupportedError";

Promise = Promise || Bluebird as any;

/**
 * Returns information about an image.
 *
 * @param {string} filePath Path to the image file.
 * @returns {Bluebird<IInfoResult>}
 */
export async function info(filePath: string): Promise<IInfoResult> {
    const args = ["-format", "%m %z %w %h %b %x %y %[orientation] %f", filePath];

    const {stdout, stderr} = await execute("identify", args);

    if (stdout === "") {
        throw new UnsupportedError("ImageMagick returned unexpected data.");
    }

    const temp = stdout
        .replace(/PixelsPerInch/g, "")
        .replace(/PixelsPerCentimeter/g, "")
        .split(/\s+/g);

    // All fields not found
    if (temp.length < 8) {
        throw new UnsupportedError("ImageMagick returned unexpected data.");
    }

    const result: IInfoResult = {
        type: temp[0].toLowerCase(),
        depth: parseInt(temp[1]),
        width: parseInt(temp[2]),
        height: parseInt(temp[3]),
        size: parseSize(temp[4]),
        density: {
            x: parseFloat(temp[5]),
            y: parseFloat(temp[6]),
        },
        orientation: temp[7],
        name: temp.slice(8).join(" ").replace(/(\r\n|\n|\r)/gm, "").trim(),
        path: filePath,
    };

    if (stderr) {
        result.warnings = stderr;
    }

    return result;
}

export interface IInfoResult {
    /**
     * Type of file.
     */
    type: string,

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
     * Any warnings that ImageMagick may have output.
     */
    warnings?: string;
}

export interface IDensity {
    x: number;
    y: number;
}

const units = {
    B: 1,
    KB: 1000,
    MB: 1000000,            // =1000^2
    GB: 1000000000,         // =1000^3
    TB: 1000000000000       // =1000^4
};

function parseSize(sizeString: string) {
    const rx = /^(\d*\.?\d*)([KMGT]?B)$/;  // regex for extract the float value and its unit
    const sizeArray = rx.exec(sizeString);

    return parseFloat(sizeArray[1]) * (units as any)[sizeArray[2]];
}
