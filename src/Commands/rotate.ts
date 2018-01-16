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
import {IBaseOptions} from "../Options";
import {ensureDestinationDirectoryExists, applyDefaultsToBaseOptions, applyBaseOptionsToArgs} from "../Utilities";
import {MissingOptionsError} from "../Errors/MissingOptionsError";
import {execute} from "../ImageMagick";
import {info, IInfoResult} from "./info";

/**
 * Rotates an image by a specified number of degrees.
 *
 * @param {IRotateOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export function rotate(options: IRotateOptions): Promise<IInfoResult> {
    return ensureDestinationDirectoryExists(options)
        .then(() => {
            const missingOptions: string[] = [];

            if (!options.src) missingOptions.push("src");
            if (!options.degree) missingOptions.push("degree");

            if (missingOptions.length) throw new MissingOptionsError(missingOptions);

            const args: string[] = [options.src];

            applyDefaultsToBaseOptions(options);
            applyBaseOptionsToArgs(options, args);

            args.push("-rotate", options.degree.toString() , options.dst);

            return execute("convert", args);
        }).then(() => info(options.dst));
}

export interface IRotateOptions extends IBaseOptions {
    /**
     * Number of degrees to rotate the image.
     */
    degree: number;
}
