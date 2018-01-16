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
import {ensureDestinationDirectoryExists, applyDefaultsToBaseOptions, applyBaseOptionsToArgs, checkForMissingArgs} from "../Utilities";
import {execute, getImageMagickVersion} from "../ImageMagick";
import {info, IInfoResult} from "./info";
import {UnsupportedError} from "../Errors/UnsupportedError";

/**
 * Creates a thumbnail of an image.
 *
 * @param {IThumbnailOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export function thumbnail(options: IThumbnailOptions): Promise<IInfoResult> {
    return ensureDestinationDirectoryExists(options)
        .then(() => {
            checkForMissingArgs(options, ["src", "width", "height"]);
        })
        .then(() => info(options.src))
        .then((infoData: IInfoResult) => {
            applyDefaultsToBaseOptions(options);
            applyDefaultsToThumbnailOptions(options);

            const args: string[] = [options.src];

            applyBaseOptionsToArgs(options, args);

            if (options.gravity) args.push("-gravity", options.gravity);

            args.push("-interpolate", options.interpolate);
            args.push("-strip");

            if (infoData.width > infoData.height) args.push("-thumbnail", `x${options.height}`);
            else args.push("-thumbnail", `${options.width}x`);

            args.push("-crop", `${options.width}x${options.height}+${options.x}+${options.y}`);
            args.push(options.dst);

            return execute("convert", args);
        }).then(() => info(options.dst));
}

export interface IThumbnailOptions extends IBaseOptions {
    height: number;
    width: number;
    gravity?: string;
    x?: number;
    y?: number;
    interpolate?: string;
}

function applyDefaultsToThumbnailOptions(options: IThumbnailOptions) {
    if (!options.x) options.x = 0;
    if (!options.y) options.y = 0;
    if (!options.interpolate) {
        const availableVersion = getImageMagickVersion();
        switch (availableVersion) {
            case 6: options.interpolate = "bicubic"; break;
            case 7: options.interpolate = "catrom"; break;
            default: throw new UnsupportedError();
        }
    }
}
