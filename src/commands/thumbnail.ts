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
import {IBaseOptions} from "../options";
import {ensureDestinationDirectoryExists, applyDefaultsToBaseOptions, applyBaseOptionsToArgs, checkForMissingOptions} from "../utilities";
import {execute, getImageMagickVersion} from "../execute";
import {info, IInfoResult} from "./info";

Promise = Promise || Bluebird as any;

/**
 * Creates a thumbnail of an image.
 *
 * @param {IThumbnailOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
export async function thumbnail(options: IThumbnailOptions): Promise<IInfoResult> {
    applyDefaultsToBaseOptions(options);
    await applyDefaultsToThumbnailOptions(options);
    checkForMissingOptions(options, ["src", "width", "height"]);

    await ensureDestinationDirectoryExists(options);

    const infoData = await info(options.src);

    const args: string[] = [options.src];

    applyBaseOptionsToArgs(options, args);

    if (options.gravity) {
        args.push("-gravity", options.gravity);
    }

    args.push("-interpolate", options.interpolate);
    args.push("-strip");

    if (infoData.width > infoData.height) {
        args.push("-thumbnail", `x${options.height}`);
    } else {
        args.push("-thumbnail", `${options.width}x`);
    }

    args.push("-crop", `${options.width}x${options.height}+${options.x}+${options.y}`);
    args.push(options.dst);

    await execute("convert", args);
    return info(options.dst);
}

export interface IThumbnailOptions extends IBaseOptions {
    /**
     * Height of thumbnail.
     */
    height: number;

    /**
     * Width of thumbnail.
     */
    width: number;

    /**
     * Gravity for sizing.
     * @see https://www.imagemagick.org/script/command-line-options.php#gravity
     */
    gravity?: string;

    /**
     * X offset for thumbnail.
     */
    x?: number;

    /**
     * Y offset for thumbnail.
     */
    y?: number;

    /**
     * Interpolate the thumbnail.
     */
    interpolate?: string;
}

async function applyDefaultsToThumbnailOptions(options: IThumbnailOptions) {
    if (!options.x) {
        options.x = 0;
    }
    if (!options.y) {
        options.y = 0;
    }
    if (!options.interpolate) {
        const availableVersion = await getImageMagickVersion();
        switch (availableVersion) {
            case 6:
                options.interpolate = "bicubic";
                break;
            case 7:
                options.interpolate = "catrom";
                break;
        }
    }
}
