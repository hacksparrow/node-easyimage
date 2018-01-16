"use strict";
exports.__esModule = true;
var Promise = require("bluebird");
var child_process_1 = require("child_process");
var ImageMagickMissingError_1 = require("./Errors/ImageMagickMissingError");
var UnsupportedError_1 = require("./Errors/UnsupportedError");
var availableImageMagickVersion = null;
if (isVersion7()) {
    availableImageMagickVersion = 7;
}
else if (isVersion6()) {
    availableImageMagickVersion = 6;
}
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
