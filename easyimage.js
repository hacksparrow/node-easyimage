var Q = require('q');
var exec = require('child_process').execFile;
var child, args;

var error_messages = {
	'path': 'Missing image paths.\nMake sure both source and destination files are specified.',
	'dim': 'Missing dimensions.\nSpecify the width atleast.',
	'restricted': 'The command you are trying to execute is prohibited.',
	'unsupported': 'File not supported.',
};

// general info function
function info(file) {

	var deferred = Q.defer();

	//file = quoted_name(file);
	// %z = depth, %m = type, %w = width, %h = height, %b = filesize in byte, %f = filename, %x = density
	args = ['-format', '%m %z %w %h %b %x %f', file];

	child = exec('identify', args, function(err, stdout, stderr) {
		var info = {};

		//Basic error handling
		if (stdout) {
			var temp = stdout.replace('PixelsPerInch', '').replace('PixelsPerCentimeter', '').split(' ');
			
			//Basic error handling:
			if (temp.length < 7) {
				deferred.reject(new Error(stderr || error_messages['unsupported']));
			} else {

				info.type    = temp[0];
				info.depth   = parseInt(temp[1]);
				info.width   = parseInt(temp[2]);
				info.height  = parseInt(temp[3]);
				info.size    = parseInt(temp[4]);
				info.density = parseFloat(temp[5]);
				info.name    = temp.slice(6).join(' ').replace(/(\r\n|\n|\r)/gm, '').trim();

				if (stderr) {
					info.warnings = stderr.split('\n');
				}

				deferred.resolve(info);
			}
		} else {
			deferred.reject(new Error(stderr || error_messages['unsupported']));
		}
	});

	return deferred.promise;
}

// function to quote file names, if not already
function quoted_name(name) {
	if (name[0] != '"') name = '"' + name;
	if (name[name.length - 1] != '"') name = name + '"';
	return name;
};


// get basic information about an image file
exports.info = function(file) {
	return info(file);
};

// convert a file type to another
exports.convert = function(options) {

	var deferred = Q.defer();

	process.nextTick(function () {

		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);

		// options.src = quoted_name(options.src);
		// options.dst = quoted_name(options.dst);
		if (options.quality === undefined) args = [options.src, options.dst];
		else args = [options.src, '-quality', options.quality, options.dst];

		child = exec('convert', args, function(err, stdout, stderr) {

			if (err) deferred.reject(err);
			else deferred.resolve(info(options.dst));
		});

	})

	return deferred.promise;
};

// resize an image
exports.resize = function(options) {

	var deferred = Q.defer();

	process.nextTick(function () {

		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);
		if (options.width === undefined) return deferred.reject(error_messages['dim']);

		options.height = options.height || options.width;
		// options.src = quoted_name(options.src);
		// options.dst = quoted_name(options.dst);
		if (options.quality === undefined) args = [options.src, '-resize', options.width + 'x' + options.height, options.dst];
		else args = [options.src, '-resize', options.width + 'x' + options.height, '-quality', options.quality, options.dst];

		child = exec('convert', args, function(err, stdout, stderr) {
			if (err) deferred.reject(err);
			deferred.resolve(info(options.dst));
		});		

	})

	return deferred.promise;
};

// crop an image
exports.crop = function(options) {

	var deferred = Q.defer();

	if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);
	if (options.cropwidth === undefined) return deferred.reject(error_messages['dim']);

	options.cropheight = options.cropheight || options.cropwidth;
	options.gravity = options.gravity || 'Center';
	options.x = options.x || 0;
	options.y = options.y || 0;
	// options.src = quoted_name(options.src);
	// options.dst = quoted_name(options.dst);

	if (options.quality === undefined) args = [options.src, '-gravity', options.gravity, '-crop', options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y, options.dst];
	else args = [options.src, '-gravity', options.gravity, '-crop', options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y, '-quality', options.quality, options.dst];

	child = exec('convert', args, function(err, stdout, stderr) {
		if (err) deferred.reject(err);
		deferred.resolve(info(options.dst));
	});

	return deferred.promise;
};

// resize and crop in one shot!
exports.rescrop = function(options) {

	var deferred = Q.defer();

	process.nextTick(function () {

		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);
		if (options.width === undefined) return deferred.reject(error_messages['dim']);

		options.height = options.height || options.width;

		options.cropwidth = options.cropwidth || options.width;
		options.cropheight = options.cropheight || options.height;

		options.gravity = options.gravity || 'Center';
		options.x = options.x || 0;
		options.y = options.y || 0;
		// options.src = quoted_name(options.src);
		// options.dst = quoted_name(options.dst);
		options.fill = options.fill ? '^' : '';
		if (options.quality === undefined) args = [options.src, '-resize', options.width + 'x' + options.height + options.fill, '-gravity', options.gravity, '-crop', options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y, options.dst];
		else args = [options.src, '-resize', options.width + 'x' + options.height, options.fill, '-gravity' + options.gravity, '-crop', options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y, '-quality', options.quality, options.dst];

		child = exec('convert', args, function(err, stdout, stderr) {
			if (err) deferred.reject(err);
			deferred.resolve(info(options.dst));
		});		

	})

	return deferred.promise;
};

// create thumbnails
exports.thumbnail = function(options) {

	var deferred = Q.defer();

	process.nextTick(function () {

		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);
		if (options.width === undefined) return deferred.reject(error_messages['dim']);
		
		options.height = options.height || options.width;
		options.gravity = options.gravity || 'Center';
		options.x = options.x || 0;
		options.y = options.y || 0;
		// options.src = quoted_name(options.src);
		// options.dst = quoted_name(options.dst);

		info(options.src).then(function(original) {

			// dimensions come as strings, convert them to number
			original.width = +original.width;
			original.height = +original.height;

			var resizewidth = options.width;
			var resizeheight = options.height;

			if (original.width > original.height) { resizewidth = ''; }
			else if (original.height > original.width) { resizeheight = ''; }

			// resize and crop
			if (options.quality === undefined) args = [options.src, '-interpolate', 'bicubic', '-strip', '-thumbnail',  resizewidth + 'x' + resizeheight, '-gravity', options.gravity, '-crop', options.width + 'x'+ options.height + '+' + options.x + '+' + options.y, options.dst];
			else args = [options.src, '-interpolate', 'bicubic', '-strip', '-thumbnail', resizewidth + 'x' + resizeheight, '-quality', options.quality, '-gravity', options.gravity, '-crop', options.width + 'x'+ options.height + '+' + options.x + '+' + options.y, options.dst];

			child = exec('convert', args, function(err, stdout, stderr) {
				if (err) return deferred.reject(err);
				deferred.resolve(info(options.dst));
			});

		}, function (err) { deferred.reject(err); });		

	})

	return deferred.promise;
};

// issue your own ImageMagick command
exports.exec = function(command) {

	var deferred = Q.defer();

	process.nextTick(function () {

		args = command.split(' ').slice(1);

		child = exec('convert', args, function(err, stdout, stderr) {
			if (err) return deferred.reject(err);
			deferred.resolve(stdout);
		});		

	})

	return deferred.promise;
};

