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
 * Resizes an image.
 *
 * @param {IResizeOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
function resize(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var args, resizeDefinition;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Utilities_1.checkForMissingOptions(options, ["src", "width"]);
                    Utilities_1.applyDefaultsToBaseOptions(options);
                    applyDefaultsToResizeOptions(options);
                    return [4 /*yield*/, Utilities_1.ensureDestinationDirectoryExists(options)];
                case 1:
                    _a.sent();
                    args = [options.src];
                    Utilities_1.applyBaseOptionsToArgs(options, args);
                    resizeDefinition = options.width + "x" + options.height + (options.ignoreAspectRatio ? "!" : "");
                    args.push("-resize", resizeDefinition, options.dst);
                    return [4 /*yield*/, ImageMagick_1.execute("convert", args)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, info_1.info(options.dst)];
            }
        });
    });
}
exports.resize = resize;
function applyDefaultsToResizeOptions(options) {
    if (options.ignoreAspectRatio === undefined) {
        options.ignoreAspectRatio = false;
    }
    if (!options.height) {
        options.height = options.width;
    }
}
