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
import {exists} from "fs";
import * as mkdirp from "mkdirp";
import {tmpdir} from "os";
import {dirname, extname} from "path";
import {generate} from "shortid";
import {BadDestinationError} from "./Errors/BadDestinationError";
import {IBaseOptions} from "./Options";
import {MissingOptionsError} from "./Errors/MissingOptionsError";
import {MissingExtensionError} from "./Errors/MissingExtensionError";

Promise = Promise || Bluebird as any;

export function ensureDestinationDirectoryExists(options: IBaseOptions) {
    if (!options.dst) {
        return Promise.reject(new MissingOptionsError(["dst"]));
    }

    return new Promise((resolve, reject) => {
        const targetDirectory = dirname(options.dst);

        exists(targetDirectory, (doesExist) => {
            if (doesExist) {
                resolve();
            } else {
                mkdirp(targetDirectory, (err: Error, wasMade) => {
                    if (err) {
                        return reject(err);
                    }

                    if (wasMade) {
                        resolve();
                    } else {
                        reject(new BadDestinationError());
                    }
                });
            }
        });
    });
}

export function applyDefaultsToBaseOptions(options: IBaseOptions) {
    if (!options.hasOwnProperty("autoOrient")) {
        options.autoOrient = true;
    }
    if (!options.hasOwnProperty("dst")) {
        options.dst = makeTemporaryFile(options.src);
    }
}

export function applyBaseOptionsToArgs(options: IBaseOptions, args: string[]) {
    if (options.flatten && options.background) {
        args.push("-flatten", "-background", options.background);
    } else if (options.background) {
        args.push("-background", options.background, "-flatten");
    }

    if (options.autoOrient) {
        args.push("-auto-orient");
    }

    if (options.quality) {
        args.push("-quality", options.quality.toString());
    }
}

export function checkForMissingOptions<T extends IBaseOptions>(options: T, requiredArgs: Array<keyof T>) {
    const missingArgs: Array<keyof T> = [];

    for (const requiredArg of requiredArgs) {
        if (!options.hasOwnProperty(requiredArg)) {
            missingArgs.push(requiredArg);
        }
    }

    if (missingArgs.length) {
        throw new MissingOptionsError(missingArgs);
    }
}

function makeTemporaryFile(sourceFile: string) {
    const extension = extname(sourceFile);
    if (!extension) {
        throw new MissingExtensionError(sourceFile);
    }
    const fileName = generate();
    return `${tmpdir()}/EasyImage-${fileName}.${extension}`;
}
