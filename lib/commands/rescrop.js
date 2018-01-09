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
 * Resize and crop an image.
 *
 * @param options
 * @returns {PromiseLike<any>}
 */
exports.rescrop = function rescrop(options) {
    return utils.ensureDestinationDirectory(options)
        .then(function () {
            if (options.src === undefined) {
                throw new Error(utils.errorMessages['path']);
            }

            if (options.width === undefined) {
                throw new Error(utils.errorMessages['dim']);
            }

            options.height = options.height || options.width;

            options.cropwidth = options.cropwidth || options.width;
            options.cropheight = options.cropheight || options.height;

            options.gravity = options.gravity || 'Center';
            options.x = options.x || 0;
            options.y = options.y || 0;
            options.fill = options.fill ? '^' : '';

            var args = [options.src];

            utils.applyFlattenAndBackgroundToArgs(options, args);

            args.push('-auto-orient');
            args.push('-gravity');
            args.push(options.gravity);
            args.push('-resize');
            args.push(options.width + 'x' + options.height + options.fill);
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
