"use strict";
exports.__esModule = true;
var Utilities_1 = require("../Utilities");
var MissingOptionsError_1 = require("../Errors/MissingOptionsError");
var ImageMagick_1 = require("../ImageMagick");
var info_1 = require("./info");
function resize(options) {
    return Utilities_1.ensureDestinationDirectoryExists(options)
        .then(function () {
        var missingOptions = [];
        if (!options.src)
            missingOptions.push("src");
        if (!options.width)
            missingOptions.push("cropWidth");
        if (missingOptions.length)
            throw new MissingOptionsError_1.MissingOptionsError(missingOptions);
        var args = [options.src];
        Utilities_1.applyDefaultsToBaseOptions(options);
        applyDefaultsToResizeOptions(options);
        Utilities_1.applyBaseOptionsToArgs(options, args);
        var resizeDefinition = options.width + "x" + options.height + (options.ignoreAspectRatio ? "!" : "");
        args.push("-resize", resizeDefinition, options.dst);
        return ImageMagick_1.execute("convert", args);
    }).then(function () { return info_1.info(options.dst); });
}
exports.resize = resize;
function applyDefaultsToResizeOptions(options) {
    if (options.ignoreAspectRatio === undefined)
        options.ignoreAspectRatio = false;
    if (!options.height)
        options.height = options.width;
}
