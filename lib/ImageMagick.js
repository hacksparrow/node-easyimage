"use strict";
/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */
exports.__esModule = true;
var Bluebird = require("bluebird");
var child_process_1 = require("child_process");
var ImageMagickMissingError_1 = require("./Errors/ImageMagickMissingError");
var UnsupportedError_1 = require("./Errors/UnsupportedError");
Promise = Promise || Bluebird;
var availableImageMagickVersion = null;
if (isVersion7()) {
    availableImageMagickVersion = 7;
}
else if (isVersion6()) {
    availableImageMagickVersion = 6;
}
/**
 * Executes a command with arguments and returns the stdout and stderr.
 *
 * @param {string} command the command to run (convert, identify, etc).
 * @param {string[]} args
 * @returns {Promise<IImageMagickCommandResult>}
 */
function execute(command, args) {
    return new Promise(function (resolve, reject) {
        if (availableImageMagickVersion === null) {
            return reject(new ImageMagickMissingError_1.ImageMagickMissingError());
        }
        if (availableImageMagickVersion === 7) {
            args.unshift(command);
            command = "magick";
        }
        if (process.env.EASYIMAGEDEBUG === "true")
            console.log(command + " " + args.join(" "));
        child_process_1.execFile(command, args, function (err, stdout, stderr) {
            if (err) {
                return reject(new UnsupportedError_1.UnsupportedError());
            }
            return resolve({ stdout: stdout, stderr: stderr });
        });
    });
}
exports.execute = execute;
/**
 * Returns the latest available version of ImageMagick
 *
 * @returns {number}
 */
function getImageMagickVersion() {
    return availableImageMagickVersion;
}
exports.getImageMagickVersion = getImageMagickVersion;
function isVersion7() {
    try {
        var resultBuffer = child_process_1.execFileSync('magick', ['-version']);
        var resultString = resultBuffer.toString();
        return /ImageMagick/.test(resultString);
    }
    catch (e) {
        return false;
    }
}
function isVersion6() {
    try {
        var resultBuffer = child_process_1.execFileSync('convert', ['-version']);
        var resultString = resultBuffer.toString();
        return /ImageMagick/.test(resultString);
    }
    catch (e) {
        return false;
    }
}
