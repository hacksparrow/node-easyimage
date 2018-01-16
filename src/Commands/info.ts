/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */

import * as Promise from "bluebird";
import {execute} from "../ImageMagick";
import {UnsupportedError} from "../Errors/UnsupportedError";

/**
 * Returns information about an image.
 *
 * @param {string} filePath
 * @returns {Bluebird<IInfoResult>}
 */
export function info(filePath: string): Promise<IInfoResult> {
    const args = ["-format", "%m %z %w %h %b %x %y %f", filePath];

    return execute("identify", args)
        .then((data) => {
            if (!data.stdout) {
                throw new UnsupportedError();
            }

            const temp = data.stdout
                .replace(/PixelsPerInch/g, "")
                .replace(/PixelsPerCentimeter/g, "")
                .replace(/Undefined/g, "")
                .split(/\s+/g);

            // All fields not found
            if (temp.length < 7) {
                throw new UnsupportedError();
            }

            const result: IInfoResult = {
                type: temp[0].toLowerCase(),
                depth: parseInt(temp[1]),
                width: parseInt(temp[2]),
                height: parseInt(temp[3]),
                size: parseSize(temp[4]),
                density: {
                    x: parseFloat(temp[5]),
                    y: parseFloat(temp[6])
                },
                name: temp.slice(7).join(' ').replace(/(\r\n|\n|\r)/gm, '').trim(),
                path: filePath
            };

            if (data.stderr) {
                result.warnings = data.stderr;
            }

            return result;
        });
}

export interface IInfoResult {
    type: string,
    depth: number;
    width: number;
    height: number;
    size: number;
    density: IDensity;
    name: string;
    path: string;
    warnings?: string;
}

interface IDensity {
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
