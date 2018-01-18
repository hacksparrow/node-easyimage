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
var child_process_1 = require("child_process");
var ImageMagickMissingError_1 = require("./errors/ImageMagickMissingError");
var UnsupportedError_1 = require("./errors/UnsupportedError");
Promise = Promise || Bluebird;
var availableImageMagickVersion = null;
/**
 * Executes a command with arguments and returns the stdout and stderr.
 *
 * @param {string} command the command to run (convert, identify, etc).
 * @param {string[]} args
 * @returns {Promise<IImageMagickCommandResult>}
 */
function execute(command, args) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var version;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getImageMagickVersion()];
                case 1:
                    version = _a.sent();
                    if (version === 7) {
                        args.unshift(command);
                        command = "magick";
                    }
                    try {
                        return [2 /*return*/, execFilePromised(command, args)];
                    }
                    catch (err) {
                        throw new UnsupportedError_1.UnsupportedError(err);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.execute = execute;
/**
 * Returns the latest available version of ImageMagick
 *
 * @param {boolean} fresh Do not used previously found version
 * @returns {Promise<number>}
 */
function getImageMagickVersion(fresh) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fresh && availableImageMagickVersion !== null) {
                        return [2 /*return*/, availableImageMagickVersion];
                    }
                    return [4 /*yield*/, hasMagicKCommand()];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 2];
                    availableImageMagickVersion = 7;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, hasConvertCommand()];
                case 3:
                    if (_a.sent()) {
                        availableImageMagickVersion = 6;
                    }
                    _a.label = 4;
                case 4:
                    if (availableImageMagickVersion === null) {
                        throw new ImageMagickMissingError_1.ImageMagickMissingError();
                    }
                    return [2 /*return*/, availableImageMagickVersion];
            }
        });
    });
}
exports.getImageMagickVersion = getImageMagickVersion;
function hasMagicKCommand() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var stdout, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, execFilePromised("magick", ["-version"])];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, /ImageMagick/.test(stdout)];
                case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function hasConvertCommand() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var stdout, e_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, execFilePromised("convert", ["-version"])];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, /ImageMagick/.test(stdout)];
                case 2:
                    e_2 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function execFilePromised(command, args) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    child_process_1.execFile(command, args, function (err, stdout, stderr) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve({ stdout: stdout, stderr: stderr });
                    });
                })];
        });
    });
}
