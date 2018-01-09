/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>
 MIT License
 */

var utils = require("../utils");
var execute = require('../execute').execute;
var info = require('./info').info;

/**
 * Converts an image from one type to another.
 *
 * @param options
 * @returns {PromiseLike<any>}
 */
exports.convert = function convert(options) {
    return utils.ensureDestinationDirectory(options)
        .then(function () {
            if (options.src === undefined) {
                throw new utils.errorMessages['path'];
            }

            var args = [options.src];
            if (options.quality) {
                args.push('-quality');
                args.push(options.quality);
            }

            utils.applyFlattenAndBackgroundToArgs(options, args);

            args.push(options.dst);

            return execute('convert', args);
        })
        .then(function () {
            return info(options.dst);
        });
};
