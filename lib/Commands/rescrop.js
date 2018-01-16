"use strict";
exports.__esModule = true;
var Utilities_1 = require("../Utilities");
var MissingOptionsError_1 = require("../Errors/MissingOptionsError");
var ImageMagick_1 = require("../ImageMagick");
var info_1 = require("./info");
function rescrop(options) {
    return Utilities_1.ensureDestinationDirectoryExists(options)
        .then(function () {
        var missingOptions = [];
        upgradeCropOptions(options);
        if (!options.src)
            missingOptions.push("src");
        if (!options.cropWidth)
            missingOptions.push("cropWidth");
        if (missingOptions.length)
            throw new MissingOptionsError_1.MissingOptionsError(missingOptions);
        var args = [options.src];
        Utilities_1.applyDefaultsToBaseOptions(options);
        applyDefaultsToCropOptions(options);
        Utilities_1.applyBaseOptionsToArgs(options, args);
        var cropDefinition = options.cropWidth + 'x' + options.cropHeight + '+' + options.x + '+' + options.y;
        var resizeDefinition = options.width + "x" + options.height + (options.ignoreAspectRatio ? "!" : "");
        if (options.gravity) {
            args.push("-gravity", options.gravity);
        }
        args.push("-resize", resizeDefinition, "-crop", cropDefinition, options.dst);
        return ImageMagick_1.execute("convert", args);
    }).then(function () { return info_1.info(options.dst); });
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
    if (!options.cropHeight)
        options.cropHeight = options.cropWidth;
    if (!options.x)
        options.x = 0;
    if (!options.y)
        options.y = 0;
}
