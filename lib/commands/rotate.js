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
 * Rotates an image by a specified number of degrees.
 *
 * @param {IRotateOptions} options
 * @returns {Bluebird<IInfoResult>}
 */
function rotate(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var args;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    utilities_1.applyDefaultsToBaseOptions(options);
                    utilities_1.checkForMissingOptions(options, ["src", "degree"]);
                    return [4 /*yield*/, utilities_1.ensureDestinationDirectoryExists(options)];
                case 1:
                    _a.sent();
                    args = [options.src];
                    utilities_1.applyBaseOptionsToArgs(options, args);
                    args.push("-rotate", options.degree.toString(), options.dst);
                    return [4 /*yield*/, execute_1.execute("convert", args)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, info_1.info(options.dst)];
            }
        });
    });
}
exports.rotate = rotate;
