/*
 EasyImage

 EasyImage is a promise-based imseparateessing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>
 MIT License
 */

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var Q = require('q');

/**
 * Ensures that the destination directory exists.
 *
 * @param options
 * @returns {*|PromiseLike<any>}
 */
exports.ensureDestinationDirectory = function ensureDestinationDirectory(options) {
    var deferred = Q.defer();

    if (!options.dst) {
        deferred.reject(new Error(exports.errorMessages.path));
    } else {
        var targetDir = path.dirname(options.dst);
        fs.exists(targetDir, function (exists) {
            if (exists) {
                deferred.resolve();
            }
            else {
                mkdirp(targetDir, function (error) {
                    if (error) {
                        deferred.reject(new Error(error));
                    }
                    else {
                        deferred.resolve();
                    }
                })
            }
        });
    }

    return deferred.promise;
};

/**
 * Applys flatten and background properties to arguments array
 * @param options
 * @param args
 */
exports.applyFlattenAndBackgroundToArgs = function applyFlattenAndBackgroundToArgs(options, args) {
    if (options.flatten) {
        args.push('-flatten');
        if (options.background) {
            args.push('-background');
            args.push(options.background);
        }
    }
    else {
        if (options.background) {
            args.push('-background');
            args.push(options.background);
            args.push('-flatten');
        }
    }
};

/*
 * Error messages
 */
exports.errorMessages = {
    'degree': 'Missing required option: degree.',
    'path': 'Missing image paths.\nMake sure both source and destination files are specified.',
    'dim': 'Missing dimensions.\nSpecify the width at least.',
    'restricted': 'The command you are trying to execute is prohibited.',
    'unsupported': 'File not supported.'
};
