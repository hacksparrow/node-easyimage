/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>
 MIT License
 */

var info = require('./info').info;
var execute = require('../execute').execute;
var utils = require('../utils');

/**
 * Resizes an image.
 *
 * @param options
 * @returns {PromiseLike<any>}
 */
exports.resize = function resize(options) {
    return utils.ensureDestinationDirectory(options)
        .then(function () {
            if (options.src === undefined) {
                throw new Error(utils.errorMessages['path']);
            }

            if (options.width === undefined) {
                throw new Error(utils.errorMessages['dim']);
            }

            options.height = options.height || options.width;

            var args = [options.src];

            utils.applyFlattenAndBackgroundToArgs(options, args);

            args.push('-auto-orient');
            args.push('-resize');
            args.push(options.width + 'x' + options.height);

            if (options.ignoreAspectRatio) {
                args[args.length - 1] += '!';
            }

            if (options.quality) {
                args.push('-quality');
                args.push(options.quality);
            }

            if (options.background) {
                args.push('-background');
                args.push(options.background);
            }
            args.push(options.dst);

            return execute('convert', args);
        })
        .then(function () {
            return info(options.dst);
        });
};
