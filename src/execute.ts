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
import { execFile } from "child_process";
import {ImageMagickMissingError} from "./errors/ImageMagickMissingError";
import {UnsupportedError} from "./errors/UnsupportedError";

Promise = Promise || Bluebird as any;

let availableImageMagickVersion: number = null;

/**
 * Executes a command with arguments and returns the stdout and stderr.
 *
 * @param {string} command the command to run (convert, identify, etc).
 * @param {string[]} args
 * @returns {Promise<IImageMagickCommandResult>}
 */
export async function execute(command: string, args: string[]): Promise<IImageMagickCommandResult> {
    const version = await getImageMagickVersion();

    if (version === 7) {
        args.unshift(command);
        command = "magick";
    }

    try {
        return execFilePromised(command, args);
    } catch (err) {
        throw new UnsupportedError(err);
    }
}

/**
 * Returns the latest available version of ImageMagick
 *
 * @param {boolean} fresh Do not used previously found version
 * @returns {Promise<number>}
 */
export async function getImageMagickVersion(fresh?: boolean) {
    if (!fresh && availableImageMagickVersion !== null) {
        return availableImageMagickVersion;
    }

    if (await hasMagicKCommand()) {
        availableImageMagickVersion = 7;
    } else if (await hasConvertCommand()) {
        availableImageMagickVersion = 6;
    }

    if (availableImageMagickVersion === null) {
        throw new ImageMagickMissingError();
    }

    return availableImageMagickVersion;
}

export interface IImageMagickCommandResult {
    stdout: string;
    stderr: string;
}

async function hasMagicKCommand() {
    try {
        const {stdout} = await execFilePromised("magick", ["-version"]);
        return /ImageMagick/.test(stdout);
    } catch (e) {
        return false;
    }
}

async function hasConvertCommand() {
    try {
        const {stdout} = await execFilePromised("convert", ["-version"]);
        return /ImageMagick/.test(stdout);
    } catch (e) {
        return false;
    }
}

interface IExecFileResult {
    stdout: string;
    stderr: string;
}

async function execFilePromised(command: string, args?: string[]): Promise<IExecFileResult> {
    return new Promise<IExecFileResult>((resolve, reject) => {
        execFile(command, args, (err: Error, stdout: string, stderr: string) => {
            if (err) {
                return reject(err);
            }

            return resolve({stdout, stderr});
        });
    });
}
