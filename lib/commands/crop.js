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
 * Crops an image.
 *
 * @param {ICropOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
function crop(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var args, cropDefinition;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    utilities_1.applyDefaultsToBaseOptions(options);
                    upgradeCropOptions(options);
                    applyDefaultsToCropOptions(options);
                    utilities_1.checkForMissingOptions(options, ["src", "cropWidth"]);
                    return [4 /*yield*/, utilities_1.ensureDestinationDirectoryExists(options)];
                case 1:
                    _a.sent();
                    args = [options.src];
                    utilities_1.applyBaseOptionsToArgs(options, args);
                    cropDefinition = "" + options.cropWidth;
                    if (options.cropHeight) {
                        cropDefinition += "x" + options.cropHeight;
                    }
                    cropDefinition += "+" + options.x + "+" + options.y;
                    if (options.gravity) {
                        args.push("-gravity", options.gravity);
                    }
                    args.push("-crop", cropDefinition, options.dst);
                    return [4 /*yield*/, execute_1.execute("convert", args)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, info_1.info(options.dst)];
            }
        });
    });
}
exports.crop = crop;
function upgradeCropOptions(options) {
    if (!options.cropWidth && options.cropwidth) {
        options.cropWidth = options.cropwidth;
    }
    if (!options.cropHeight && options.cropheight) {
        options.cropHeight = options.cropheight;
    }
}
function applyDefaultsToCropOptions(options) {
    if (!options.cropHeight) {
        options.cropHeight = options.cropWidth;
    }
    if (!options.x) {
        options.x = 0;
    }
    if (!options.y) {
        options.y = 0;
    }
}
