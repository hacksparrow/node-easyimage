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
var execute_1 = require("../execute");
var utilities_1 = require("../utilities");
var info_1 = require("./info");
Promise = Promise || Bluebird;
/**
 * Creates a thumbnail of an image.
 *
 * @param {IThumbnailOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
function thumbnail(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var infoData, args;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    utilities_1.applyDefaultsToBaseOptions(options);
                    return [4 /*yield*/, applyDefaultsToThumbnailOptions(options)];
                case 1:
                    _a.sent();
                    utilities_1.checkForMissingOptions(options, ["src", "width", "height"]);
                    return [4 /*yield*/, utilities_1.ensureDestinationDirectoryExists(options)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, info_1.info(options.src)];
                case 3:
                    infoData = _a.sent();
                    args = [options.src];
                    utilities_1.applyBaseOptionsToArgs(options, args);
                    if (options.gravity) {
                        args.push("-gravity", options.gravity);
                    }
                    args.push("-interpolate", options.interpolate);
                    args.push("-strip");
                    if (infoData.width > infoData.height) {
                        args.push("-thumbnail", "x" + options.height);
                    }
                    else {
                        args.push("-thumbnail", options.width + "x");
                    }
                    args.push("-crop", options.width + "x" + options.height + "+" + options.x + "+" + options.y);
                    args.push(options.dst);
                    return [4 /*yield*/, execute_1.execute("convert", args)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, info_1.info(options.dst)];
            }
        });
    });
}
exports.thumbnail = thumbnail;
function applyDefaultsToThumbnailOptions(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var availableVersion;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!options.x) {
                        options.x = 0;
                    }
                    if (!options.y) {
                        options.y = 0;
                    }
                    if (!!options.interpolate) return [3 /*break*/, 2];
                    return [4 /*yield*/, execute_1.getImageMagickVersion()];
                case 1:
                    availableVersion = _a.sent();
                    switch (availableVersion) {
                        case 6:
                            options.interpolate = "bicubic";
                            break;
                        case 7:
                            options.interpolate = "catrom";
                            break;
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
