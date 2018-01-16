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
import {ensureDestinationDirectoryExists, applyDefaultsToBaseOptions, applyBaseOptionsToArgs} from "../Utilities";
import {MissingOptionsError} from "../Errors/MissingOptionsError";
import {execute} from "../ImageMagick";
import {info, IInfoResult} from "./info";
import {ICropOptions} from "./crop";
import {IResizeOptions} from "./resize";

/**
 * Resizes and crops an image.
 *
 * @param {IResCropOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export function rescrop(options: IResCropOptions): Promise<IInfoResult> {
    return ensureDestinationDirectoryExists(options)
        .then(() => {
            const missingOptions: string[] = [];

            upgradeCropOptions(options);

            if (!options.src) missingOptions.push("src");
            if (!options.cropWidth) missingOptions.push("cropWidth");

            if (missingOptions.length) throw new MissingOptionsError(missingOptions);

            const args: string[] = [options.src];

            applyDefaultsToBaseOptions(options);
            applyDefaultsToCropOptions(options);
            applyBaseOptionsToArgs(options, args);

            const cropDefinition = options.cropWidth + 'x' + options.cropHeight + '+' + options.x + '+' + options.y;
            const resizeDefinition = `${options.width}x${options.height}${options.ignoreAspectRatio ? "!" : ""}`;

            if (options.gravity) {
                args.push("-gravity", options.gravity);
            }

            args.push("-resize", resizeDefinition, "-crop", cropDefinition, options.dst);

            return execute("convert", args);
        }).then(() => info(options.dst));
}

export interface IResCropOptions extends ICropOptions, IResizeOptions {

}

function upgradeCropOptions(options: ICropOptions) {
    if (!options.cropWidth && options.cropwidth) {
        options.cropWidth = options.cropwidth;
    }

    if (!options.cropHeight && options.cropheight) {
        options.cropHeight = options.cropheight;
    }
}

function applyDefaultsToCropOptions(options: ICropOptions) {
    if (!options.cropHeight) options.cropHeight = options.cropWidth;
    if (!options.x) options.x = 0;
    if (!options.y) options.y = 0;
}
