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
var Utilities_1 = require("../Utilities");
var ImageMagick_1 = require("../ImageMagick");
var info_1 = require("./info");
Promise = Promise || Bluebird;
/**
 * Resizes and crops an image.
 *
 * @param {IResCropOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
function rescrop(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var args, cropDefinition, resizeDefinition;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Utilities_1.applyDefaultsToBaseOptions(options);
                    upgradeCropOptions(options);
                    applyDefaultsToCropOptions(options);
                    return [4 /*yield*/, Utilities_1.ensureDestinationDirectoryExists(options)];
                case 1:
                    _a.sent();
                    args = [options.src];
                    Utilities_1.applyBaseOptionsToArgs(options, args);
                    cropDefinition = options.cropWidth + "x" + options.cropHeight + "+" + options.x + "+" + options.y;
                    resizeDefinition = options.width + "x" + options.height + (options.ignoreAspectRatio ? "!" : "");
                    if (options.gravity) {
                        args.push("-gravity", options.gravity);
                    }
                    args.push("-resize", resizeDefinition, "-crop", cropDefinition, options.dst);
                    return [4 /*yield*/, ImageMagick_1.execute("convert", args)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, info_1.info(options.dst)];
            }
        });
    });
}
exports.rescrop = rescrop;
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
