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
var tslib_1 = require("tslib");
var Bluebird = require("bluebird");
var UnsupportedError_1 = require("../errors/UnsupportedError");
var execute_1 = require("../execute");
Promise = Promise || Bluebird;
/**
 * Returns information about an image.
 *
 * @param {string} filePath Path to the image file.
 * @returns {Bluebird<IInfoResult>}
 */
function info(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var numberOfFrames, args, _a, stdout, stderr, temp, result;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getNumberOfFrames(filePath)];
                case 1:
                    numberOfFrames = _b.sent();
                    args = ["-format", "%m %z %w %h %b %x %y %[orientation] %f"];
                    if (numberOfFrames > 1) {
                        args.push(filePath + "[0]");
                    }
                    else {
                        args.push(filePath);
                    }
                    return [4 /*yield*/, execute_1.execute("identify", args)];
                case 2:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    if (stdout === "") {
                        throw new UnsupportedError_1.UnsupportedError("ImageMagick returned unexpected data.");
                    }
                    temp = stdout
                        .replace(/PixelsPerInch/g, "")
                        .replace(/PixelsPerCentimeter/g, "")
                        .split(/\s+/g);
                    // All fields not found
                    if (temp.length < 8) {
                        throw new UnsupportedError_1.UnsupportedError("ImageMagick returned unexpected data.");
                    }
                    result = {
                        density: {
                            x: parseFloat(temp[5]),
                            y: parseFloat(temp[6])
                        },
                        depth: parseInt(temp[1], 10),
                        frames: numberOfFrames,
                        height: parseInt(temp[3], 10),
                        name: temp.slice(8).join(" ").replace(/(\r\n|\n|\r)/gm, "").trim(),
                        orientation: temp[7],
                        path: filePath,
                        size: parseSize(temp[4]),
                        type: temp[0].toLowerCase(),
                        width: parseInt(temp[2], 10)
                    };
                    if (stderr) {
                        result.warnings = stderr;
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.info = info;
function getNumberOfFrames(filePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var args, _a, stdout, stderr;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    args = ["-format", "%n\n", "" + filePath];
                    return [4 /*yield*/, execute_1.execute("identify", args)];
                case 1:
                    _a = _b.sent(), stdout = _a.stdout, stderr = _a.stderr;
                    if (stdout === "") {
                        throw new UnsupportedError_1.UnsupportedError("ImageMagick returned unexpected data.");
                    }
                    return [2 /*return*/, parseInt(stdout.split("\n")[0], 10)];
            }
        });
    });
}
var units = {
    B: 1,
    GB: 1000000000,
    KB: 1000,
    MB: 1000000,
    TB: 1000000000000
};
function parseSize(sizeString) {
    var rx = /^(\d*\.?\d*)([KMGT]?B)$/; // regex for extract the float value and its unit
    var sizeArray = rx.exec(sizeString);
    return parseFloat(sizeArray[1]) * units[sizeArray[2]];
}
