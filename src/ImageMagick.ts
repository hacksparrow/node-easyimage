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
import { execFile, execFileSync } from "child_process";
import {ImageMagickMissingError} from "./Errors/ImageMagickMissingError";
import {UnsupportedError} from "./Errors/UnsupportedError";

Promise = Promise || Bluebird as any;

let availableImageMagickVersion: number = null;

if (isVersion7()) {
    availableImageMagickVersion = 7;
} else if (isVersion6()) {
    availableImageMagickVersion = 6;
}

/**
 * Executes a command with arguments and returns the stdout and stderr.
 *
 * @param {string} command the command to run (convert, identify, etc).
 * @param {string[]} args
 * @returns {Promise<IImageMagickCommandResult>}
 */
export function execute(command: string, args: string[]): Promise<IImageMagickCommandResult> {
    return new Promise((resolve, reject) => {
        if (availableImageMagickVersion === null) {
            return reject(new ImageMagickMissingError());
        }

        if (availableImageMagickVersion === 7) {
            args.unshift(command);
            command = "magick";
        }

        if (process.env.EASYIMAGEDEBUG === "true") console.log(command + " " + args.join(" "));

        execFile(command, args, (err: Error, stdout: string, stderr: string) => {
            if (err) {
                return reject(new UnsupportedError());
            }

            return resolve({stdout, stderr});
        });
    });
}

/**
 * Returns the latest available version of ImageMagick
 *
 * @returns {number}
 */
export function getImageMagickVersion() {
    return availableImageMagickVersion;
}

function isVersion7() {
    try {
        const resultBuffer = execFileSync('magick', ['-version']);
        const resultString = resultBuffer.toString();
        return /ImageMagick/.test(resultString);
    } catch (e) {
        return false;
    }
}

function isVersion6() {
    try {
        const resultBuffer = execFileSync('convert', ['-version']);
        const resultString = resultBuffer.toString();
        return /ImageMagick/.test(resultString);
    } catch (e) {
        return false;
    }
}

export interface IImageMagickCommandResult {
    stdout: string,
    stderr: string,
}
