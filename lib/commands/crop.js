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
var utils = require("../utils");

/**
 * Crops an image.
 *
 * @param options
 * @returns {PromiseLike<any>}
 */
exports.crop = function crop(options) {
    return utils.ensureDestinationDirectory(options)
        .then(function () {
            if (options.src === undefined) {
                throw new Error(utils.errorMessages['path']);
            }

            if (options.cropwidth === undefined) {
                throw new Error(utils.errorMessages['dim']);
            }

            options.cropheight = options.cropheight || options.cropwidth;
            options.gravity = options.gravity || 'Center';
            options.x = options.x || 0;
            options.y = options.y || 0;

            var args = [options.src];


            utils.applyFlattenAndBackgroundToArgs(options, args);

            args.push('-auto-orient');
            args.push('-gravity');
            args.push(options.gravity);
            args.push('-crop');
            args.push(options.cropwidth + 'x' + options.cropheight + '+' + options.x + '+' + options.y);
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
