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
import {IBaseOptions} from "../options";
import {applyBaseOptionsToArgs, applyDefaultsToBaseOptions, checkForMissingOptions, ensureDestinationDirectoryExists} from "../utilities";
import {IInfoResult, info} from "./info";

Promise = Promise || Bluebird as any;

/**
 * Rotates an image by a specified number of degrees.
 *
 * @param {IRotateOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export async function rotate(options: IRotateOptions): Promise<IInfoResult> {
    checkForMissingOptions(options, ["src", "degree"]);
    applyDefaultsToBaseOptions(options);

    await ensureDestinationDirectoryExists(options);

    const args: string[] = [options.src];

    applyBaseOptionsToArgs(options, args);

    args.push("-rotate", options.degree.toString(), options.dst);

    await execute("convert", args);
    return info(options.dst);
}

export interface IRotateOptions extends IBaseOptions {
    /**
     * Number of degrees to rotate the image.
     */
    degree: number;
}
