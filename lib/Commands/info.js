"use strict";
exports.__esModule = true;
var ImageMagick_1 = require("../ImageMagick");
var UnsupportedError_1 = require("../Errors/UnsupportedError");
function info(filePath) {
    var args = ["-format", "%m %z %w %h %b %x %y %f", filePath];
    return ImageMagick_1.execute("identify", args)
        .then(function (data) {
        if (!data.stdout) {
            throw new UnsupportedError_1.UnsupportedError();
        }
        var temp = data.stdout
            .replace(/PixelsPerInch/g, "")
            .replace(/PixelsPerCentimeter/g, "")
            .replace(/Undefined/g, "")
            .split(/\s+/g);
        if (temp.length < 7) {
            throw new UnsupportedError_1.UnsupportedError();
        }
        var result = {
            type: temp[0].toLowerCase(),
            depth: parseInt(temp[1]),
            width: parseInt(temp[2]),
            height: parseInt(temp[3]),
            size: parseSize(temp[4]),
            density: {
                x: parseFloat(temp[5]),
                y: parseFloat(temp[6])
            },
            name: temp.slice(7).join(' ').replace(/(\r\n|\n|\r)/gm, '').trim(),
            path: filePath
        };
        if (data.stderr) {
            result.warnings = data.stderr;
        }
        return result;
    });
}
exports.info = info;
var units = {
    B: 1,
    KB: 1000,
    MB: 1000000,
    GB: 1000000000,
    TB: 1000000000000
};
function parseSize(sizeString) {
    var rx = /^(\d*\.?\d*)([KMGT]?B)$/;
    var sizeArray = rx.exec(sizeString);
    return parseFloat(sizeArray[1]) * units[sizeArray[2]];
}
