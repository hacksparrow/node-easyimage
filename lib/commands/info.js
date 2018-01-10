/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>
 MIT License
 */

var execute = require('../execute').execute;
var utils = require("../utils");


/**
 * Gets info about image.
 *
 * @param file
 * @returns {PromiseLike<any>}
 */
exports.info = function info(file) {
    var args = ['-format'];
    args.push('%m %z %w %h %b %x %y %f');
    args.push(file);

    return execute('identify', args)
        .then(function (data) {
            if (!data.stdout) {
                throw new Error(data.stderr || utils.errorMessages['unsupported']);
            }

            var info = {};

            var temp = data.stdout.replace(/PixelsPerInch/g, '').replace(/PixelsPerCentimeter/g, '').replace(/Undefined/g, '').split(/\s+/g);

            // All fields not found
            if (temp.length < 7) {
                throw new Error(data.stderr || utils.errorMessages['unsupported']);
            }

            info.type = temp[0].toLowerCase();
            info.depth = parseInt(temp[1], 10);
            info.width = parseInt(temp[2], 10);
            info.height = parseInt(temp[3], 10);
            info.size = parseSize(temp[4]);
            info.density = {
                x: parseFloat(temp[5]),
                y: parseFloat(temp[6])
            };
            info.name = temp.slice(7).join(' ').replace(/(\r\n|\n|\r)/gm, '').trim();
            info.path = file;

            if (data.stderr) {
                info.warnings = data.stderr.split('\n');
            }

            return info;
        });
};

function parseSize(sizeString) {
    var unit = {
        B: 1,
        KB: 1000,
        MB: 1000000,            // =1000^2
        GB: 1000000000,         // =1000^3
        TB: 1000000000000       // =1000^4
    };

    var rx = /^(\d*\.?\d*)([KMGT]?B)$/;  // regex for extract the float value and its unit
    var sizeArray = rx.exec(sizeString);

    return parseFloat(sizeArray[1]) * unit[sizeArray[2]];
}
