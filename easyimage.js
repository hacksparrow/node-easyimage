/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 MIT License
 */

var exec = require('child_process').exec;
var Q = require('q');
require('colors');

exports.info = require('./lib/commands/info').info;
exports.convert = require('./lib/commands/convert').convert;
exports.rotate = require('./lib/commands/rotate').rotate;
exports.resize = require('./lib/commands/resize').resize;
exports.crop = require('./lib/commands/crop').crop;
exports.rescrop = require('./lib/commands/rescrop').rescrop;
exports.thumbnail = require('./lib/commands/thumbnail').thumbnail;
exports.execute = require('./lib/execute').execute;

/**
 * Issue your own ImageMagick command.
 *
 * @deprecated
 *
 * @param cmd
 * @returns {*|PromiseLike<any>}
 */
exports.exec = function(cmd) {
	process.stderr.write('This command is deprecated. Please update to using execute\n'.yellow);
	var deferred = Q.defer();

	process.nextTick(function () {
		child = exec(cmd, function(err, stdout) {
			if (err) return deferred.reject(err);
			deferred.resolve(stdout);
		});
	});

	return deferred.promise;
};
