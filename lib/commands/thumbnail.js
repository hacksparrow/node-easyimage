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
var availableVersion = require('../execute').availableVersion;
var info = require('./info').info;
var execute = require('../execute').execute;

/**
 * Create a thumbnail of an image.
 *
 * @param options
 * @returns {PromiseLike<any>}
 */
exports.thumbnail = function thumbnail(options) {
    return utils.ensureDestinationDirectory(options)
        .then(function () {
            return info(options.src);
        })
        .then(function (infoData) {
            if (options.src === undefined) {
                throw new Error(utils.errorMessages['path']);
            }

            if (options.width === undefined && options.height === undefined) {
                throw new Error(utils.errorMessages['dim']);
            }

            options.height = options.height || options.width;
            options.gravity = options.gravity || 'Center';
            options.x = options.x || 0;
            options.y = options.y || 0;

            // TODO Why are we doing this??
            infoData.width = +infoData.width;
            infoData.height = +infoData.height;

            var resizeWidth = options.width;
            var resizeHeight = options.height;

            if (infoData.width > infoData.height) {
                resizeWidth = '';
            }
            else if (infoData.height > infoData.width) {
                resizeHeight = '';
            }

            var args = [options.src];

            utils.applyFlattenAndBackgroundToArgs(options, args);

            args.push('-auto-orient');
            args.push('-gravity');
            args.push(options.gravity);
            args.push('-interpolate');
            args.push(availableVersion === 7 ? 'catrom' : 'bicubic');
            args.push('-strip');
            args.push('-thumbnail');
            args.push(resizeWidth + 'x' + resizeHeight);
            args.push('-crop');
            args.push(options.width + 'x' + options.height + '+' + options.x + '+' + options.y);
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
