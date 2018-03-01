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
var fs_1 = require("fs");
var mkdirp = require("mkdirp");
var os_1 = require("os");
var path_1 = require("path");
var BadDestinationError_1 = require("./errors/BadDestinationError");
var MissingExtensionError_1 = require("./errors/MissingExtensionError");
var MissingOptionsError_1 = require("./errors/MissingOptionsError");
var nanoid = require("nanoid");
Promise = Promise || Bluebird;
function ensureDestinationDirectoryExists(options) {
    if (!options.dst) {
        return Promise.reject(new MissingOptionsError_1.MissingOptionsError(["dst"]));
    }
    return new Promise(function (resolve, reject) {
        var targetDirectory = path_1.dirname(options.dst);
        fs_1.exists(targetDirectory, function (doesExist) {
            if (doesExist) {
                resolve();
            }
            else {
                mkdirp(targetDirectory, function (err, wasMade) {
                    if (err) {
                        return reject(err);
                    }
                    if (wasMade) {
                        resolve();
                    }
                    else {
                        reject(new BadDestinationError_1.BadDestinationError());
                    }
                });
            }
        });
    });
}
exports.ensureDestinationDirectoryExists = ensureDestinationDirectoryExists;
function applyDefaultsToBaseOptions(options) {
    if (!options.hasOwnProperty("autoOrient")) {
        options.autoOrient = true;
    }
    if (!options.hasOwnProperty("dst")) {
        options.dst = makeTemporaryFile(options.src);
    }
}
exports.applyDefaultsToBaseOptions = applyDefaultsToBaseOptions;
function applyBaseOptionsToArgs(options, args) {
    if (options.flatten && options.background) {
        args.push("-flatten", "-background", options.background);
    }
    else if (options.background) {
        args.push("-background", options.background, "-flatten");
    }
    if (options.autoOrient) {
        args.push("-auto-orient");
    }
    if (options.coalesce) {
        args.push("-coalesce");
    }
    if (options.quality) {
        args.push("-quality", options.quality.toString());
    }
    if (path_1.extname(options.src) === ".pdf") {
        args.push("-append");
    }
}
exports.applyBaseOptionsToArgs = applyBaseOptionsToArgs;
function checkForMissingOptions(options, requiredArgs) {
    var missingArgs = [];
    for (var _i = 0, requiredArgs_1 = requiredArgs; _i < requiredArgs_1.length; _i++) {
        var requiredArg = requiredArgs_1[_i];
        if (!options.hasOwnProperty(requiredArg)) {
            missingArgs.push(requiredArg);
        }
    }
    if (missingArgs.length) {
        throw new MissingOptionsError_1.MissingOptionsError(missingArgs);
    }
}
exports.checkForMissingOptions = checkForMissingOptions;
function makeTemporaryFile(sourceFile) {
    var extension = path_1.extname(sourceFile);
    if (!extension) {
        throw new MissingExtensionError_1.MissingExtensionError(sourceFile);
    }
    var fileName = nanoid(8);
    return os_1.tmpdir() + "/EasyImage-" + fileName + extension;
}
