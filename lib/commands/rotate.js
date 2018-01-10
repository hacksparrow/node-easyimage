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
 * Rotate an image.
 *
 * @param options
 * @returns {PromiseLike<any>}
 */
exports.rotate = function rotate(options) {
    return utils.ensureDestinationDirectory(options)
        .then(function () {
            if (options.src === undefined) {
                throw new Error(utils.errorMessages['path']);
            }

            if (options.degree === undefined) {
                throw new Error(utils.errorMessages['degree']);
            }

            var args = [options.src];

            utils.applyFlattenAndBackgroundToArgs(options, args);

            args.push('-rotate');
            args.push(options.degree);
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
