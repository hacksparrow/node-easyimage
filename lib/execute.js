/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>
 MIT License
 */

var Q = require('q');
var childProcess = require('child_process');
require('colors');

var availableVersion = null;

if (isVersion7()) {
    availableVersion = 7;
} else if (isVersion6()) {
    availableVersion = 6;
}

/**
 * What version is available.
 */
exports.availableVersion = availableVersion;

/**
 * Executes an ImageMagick command with arguments.
 *
 * @param command
 * @param args
 * @returns {*|PromiseLike<any>}
 */
exports.execute = function execute(command, args) {
    var deferred = Q.defer();

    if (availableVersion === null) {
        deferred.reject(new Error(
            ' ImageMagick Not Found'.red + '\n' +
            ' EasyImage requires ImageMagick to work. Install it from http://www.imagemagick.org/script/binary-releases.php.\n'
        ));
    } else {
        if (availableVersion === 7) {
            args.unshift(command);
            command = 'magick';
        }

        childProcess.execFile(command, args, function (err, stdout, stderr) {
            if (err) {
                deferred.reject(new Error(stderr || err));
            } else {
                deferred.resolve({
                    stdout: stdout.toString(),
                    stderr: stderr.toString()
                });
            }
        })
    }

    return deferred.promise;
};

function isVersion7() {
    try {
        childProcess.execFileSync('magick', ['-version']);
        return true;
    } catch (e) {
        return false;
    }
}

function isVersion6() {
    try {
        childProcess.execFileSync('convert', ['-version']);
        return true;
    } catch (e) {
        return false;
    }
}
