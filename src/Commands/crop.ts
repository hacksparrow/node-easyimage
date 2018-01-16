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
 * Crops an image.
 *
 * @param {ICropOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export function crop(options: ICropOptions): Promise<IInfoResult> {
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

            if (options.gravity) {
                args.push("-gravity", options.gravity);
            }

            args.push("-crop", cropDefinition, options.dst);

            return execute("convert", args);
        }).then(() => info(options.dst));
}

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
