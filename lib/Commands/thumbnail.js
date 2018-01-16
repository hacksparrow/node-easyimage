"use strict";
exports.__esModule = true;
var Utilities_1 = require("../Utilities");
var ImageMagick_1 = require("../ImageMagick");
var info_1 = require("./info");
var UnsupportedError_1 = require("../Errors/UnsupportedError");
function thumbnail(options) {
    return Utilities_1.ensureDestinationDirectoryExists(options)
        .then(function () {
        Utilities_1.checkForMissingArgs(options, ["src", "width", "height"]);
    })
        .then(function () { return info_1.info(options.src); })
        .then(function (infoData) {
        Utilities_1.applyDefaultsToBaseOptions(options);
        applyDefaultsToThumbnailOptions(options);
        var args = [options.src];
        Utilities_1.applyBaseOptionsToArgs(options, args);
        if (options.gravity)
            args.push("-gravity", options.gravity);
        args.push("-interpolate", options.interpolate);
        args.push("-strip");
        if (infoData.width > infoData.height)
            args.push("-thumbnail", "x" + options.height);
        else
            args.push("-thumbnail", options.width + "x");
        args.push("-crop", options.width + "x" + options.height + "+" + options.x + "+" + options.y);
        args.push(options.dst);
        return ImageMagick_1.execute("convert", args);
    }).then(function () { return info_1.info(options.dst); });
}
exports.thumbnail = thumbnail;
function applyDefaultsToThumbnailOptions(options) {
    if (!options.x)
        options.x = 0;
    if (!options.y)
        options.y = 0;
    if (!options.interpolate) {
        var availableVersion = ImageMagick_1.getImageMagickVersion();
        switch (availableVersion) {
            case 6:
                options.interpolate = "bicubic";
                break;
            case 7:
                options.interpolate = "catrom";
                break;
            default: throw new UnsupportedError_1.UnsupportedError();
        }
    }
}
