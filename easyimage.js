var Q = require('q');
var exec = require('child_process').execFile;
var command = require('child_process').exec;
var colors = require('colors');
var child;
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

// check if ImageMagick is available on the system
command('convert -version', function(err, stdout, stderr) {

	// ImageMagick is NOT available on the system, exit with download info
	if (err) {
		console.log(' ImageMagick Not Found'.red)
		console.log(' EasyImage requires ImageMagick to work. Install it from http://www.imagemagick.org/script/binary-releases.php.\n')
	}

})

var error_messages = {
	'path': 'Missing image paths.\nMake sure both source and destination files are specified.',
	'dim': 'Missing dimensions.\nSpecify the width atleast.',
	'restricted': 'The command you are trying to execute is prohibited.',
	'unsupported': 'File not supported.',
};

// general info function
function info(file) {

	var deferred = Q.defer();
	var parseSize = function(sizeString) {

		var unit = {
			B: 1,
			KB: 1000,
			MB: 1000000,            // =1000^2
			GB: 1000000000,         // =1000^3
			TB: 1000000000000       // =1000^4
		};

		var rx = /^(\d*\.?\d*)([KMGT]?B)$/;  // regex for extract the float value and its unit
		var sizeArray = rx.exec(sizeString);

		return parseFloat(sizeArray[1]) * unit[sizeArray[2]];
	};

	//file = quoted_name(file);
	// %z = depth, %m = type, %w = width, %h = height, %b = rounded filesize in byte, %f = filename, %x = density
	var args = ['-format']
	args.push('%m %z %w %h %b %x %y %f')
	args.push(file)

	child = exec('identify', args, function(err, stdout, stderr) {
		var info = {};
		//console.log(stdout)
		//Basic error handling
		if (stdout) {
      var temp = stdout.replace(/PixelsPerInch/g, '').replace(/PixelsPerCentimeter/g, '').replace(/Undefined/g, '').split(/\s+/g);

			//Basic error handling:
			if (temp.length < 7) {
				deferred.reject(new Error(stderr || error_messages['unsupported']));
			} else {

				info.type    = temp[0].toLowerCase();
				info.depth   = parseInt(temp[1]);
				info.width   = parseInt(temp[2]);
				info.height  = parseInt(temp[3]);
				info.size    = parseSize(temp[4]);
				info.density = {
					x: parseFloat(temp[5]),
					y: parseFloat(temp[6]),
				};
				info.name    = temp.slice(7).join(' ').replace(/(\r\n|\n|\r)/gm, '').trim();
				info.path = file;

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



function directoryCheck(options, command) {

	var targetDir = path.dirname(options.dst)
	fs.exists(targetDir, function (exists) {
		if (exists) {
			command()
		}
		else {
			mkdirp(targetDir, function (error) {
				if (error) {
					throw new Error(error)
				}
				else {
					command()
				}
			})
		}
	})
}


// convert a file type to another
exports.convert = function(options) {

	var deferred = Q.defer();

	function imgConvert() {

		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);

		var args = [options.src]
		if (options.quality) {
			args.push('-quality')
			args.push(options.quality)
		}

		if (options.flatten) {
			args.push('-flatten')
			if (options.background) {
				args.push('-background')
				args.push(options.background)
			}	
		}
		else {
			if (options.background) {
				args.push('-background')
				args.push(options.background)
				args.push('-flatten')
			}	
		}

		args.push(options.dst)

		child = exec('convert', args, function(err, stdout, stderr) {

			if (err) deferred.reject(err);
			else deferred.resolve(info(options.dst));
		});

	}

	directoryCheck(options, imgConvert)

	return deferred.promise;
};


// rotate a file
exports.rotate = function(options) {

	var deferred = Q.defer();

	function imgRotate() {

		if (options.src === undefined || options.dst === undefined || options.degree === undefined) return deferred.reject(error_messages['path']);

		var args = [options.src]

		if (options.flatten) {
			args.push('-flatten')
			if (options.background) {
				args.push('-background')
				args.push(options.background)
			}	
		}
		else {
			if (options.background) {
				args.push('-background')
				args.push(options.background)
				args.push('-flatten')
			}	
		}

		args.push('-rotate')
		args.push(options.degree)
 		if (options.background) {
			args.push('-background')
			args.push(options.background)
		}
		args.push(options.dst)

		child = exec('convert', args, function(err, stdout, stderr) {
			if (err) deferred.reject(err);
			else deferred.resolve(info(options.dst));
		});

	}

	directoryCheck(options, imgRotate)

	return deferred.promise;
};

// resize an image
exports.resize = function(options) {

	var deferred = Q.defer();

	function imgResize() {

		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);
		if (options.width === undefined) return deferred.reject(error_messages['dim']);

		options.height = options.height || options.width;

    var args = [options.src]

		if (options.flatten) {
			args.push('-flatten')
			if (options.background) {
				args.push('-background')
				args.push(options.background)
			}	
		}
		else {
			if (options.background) {
				args.push('-background')
				args.push(options.background)
				args.push('-flatten')
			}	
		}

    args.push('-auto-orient')
    args.push('-resize')
    args.push(options.width + 'x' + options.height)
    if (options.ignoreAspectRatio) {
      args[args.length-1] += '!';
    }
    if (options.quality) {
    	args.push('-quality')
    	args.push(options.quality)
    }
 		if (options.background) {
			args.push('-background')
			args.push(options.background)
		}
    args.push(options.dst)

		child = exec('convert', args, function(err, stdout, stderr) {
			if (err) deferred.reject(err);
			deferred.resolve(info(options.dst));
		});

	}

	directoryCheck(options, imgResize)
	return deferred.promise;
};

// crop an image
exports.crop = function(options) {

	var deferred = Q.defer();

	function imgCrop() {
		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);
		if (options.cropwidth === undefined) return deferred.reject(error_messages['dim']);

		options.cropheight = options.cropheight || options.cropwidth;
		options.gravity = options.gravity || 'Center';
		options.x = options.x || 0;
		options.y = options.y || 0;

    var args = [options.src]

		if (options.flatten) {
			args.push('-flatten')
			if (options.background) {
				args.push('-background')
				args.push(options.background)
			}	
		}
		else {
			if (options.background) {
				args.push('-background')
				args.push(options.background)
				args.push('-flatten')
			}	
		}

    args.push('-auto-orient')
    args.push('-gravity')
    args.push(options.gravity)
    args.push('-crop')
    args.push(options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y)
    if (options.quality) {
    	args.push('-quality')
    	args.push(options.quality)
    }
 		if (options.background) {
			args.push('-background')
			args.push(options.background)
		}
    args.push(options.dst)

		child = exec('convert', args, function(err, stdout, stderr) {
			if (err) deferred.reject(err);
			deferred.resolve(info(options.dst));
		});
	}

	directoryCheck(options, imgCrop)
	return deferred.promise;
};

// resize and crop in one shot!
exports.rescrop = function(options) {

	var deferred = Q.defer();

	function imgResCrop() {

		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);
		if (options.width === undefined) return deferred.reject(error_messages['dim']);

		options.height = options.height || options.width;

		options.cropwidth = options.cropwidth || options.width;
		options.cropheight = options.cropheight || options.height;

		options.gravity = options.gravity || 'Center';
		options.x = options.x || 0;
		options.y = options.y || 0;
		options.fill = options.fill ? '^' : '';

    var args = [options.src]

		if (options.flatten) {
			args.push('-flatten')
			if (options.background) {
				args.push('-background')
				args.push(options.background)
			}	
		}
		else {
			if (options.background) {
				args.push('-background')
				args.push(options.background)
				args.push('-flatten')
			}	
		}

    args.push('-auto-orient')
    args.push('-gravity')
    args.push(options.gravity)
    args.push('-resize')
    args.push(options.width + 'x' + options.height + options.fill)
    args.push('-crop')
    args.push(options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y)
    if (options.quality) {
    	args.push('-quality')
    	args.push(options.quality)
    }
 		if (options.background) {
			args.push('-background')
			args.push(options.background)
		}
    args.push(options.dst)

		child = exec('convert', args, function(err, stdout, stderr) {
			if (err) deferred.reject(err);
			deferred.resolve(info(options.dst));
		});

	}

	directoryCheck(options, imgResCrop)
	return deferred.promise;
};

// create thumbnails
exports.thumbnail = function(options) {

	var deferred = Q.defer();

	function imgThumbnail() {

		if (options.src === undefined || options.dst === undefined) return deferred.reject(error_messages['path']);
		if (options.width === undefined) return deferred.reject(error_messages['dim']);

		options.height = options.height || options.width;
		options.gravity = options.gravity || 'Center';
		options.x = options.x || 0;
		options.y = options.y || 0;

		info(options.src).then(function(original) {

			// dimensions come as strings, convert them to number
			original.width = +original.width;
			original.height = +original.height;

			var resizewidth = options.width;
			var resizeheight = options.height;

			if (original.width > original.height) { resizewidth = ''; }
			else if (original.height > original.width) { resizeheight = ''; }

	    var args = [options.src]

			if (options.flatten) {
				args.push('-flatten')
				if (options.background) {
					args.push('-background')
					args.push(options.background)
				}	
			}
			else {
				if (options.background) {
					args.push('-background')
					args.push(options.background)
					args.push('-flatten')
				}	
			}

	    args.push('-auto-orient')
	    args.push('-gravity')
	    args.push(options.gravity)
	    args.push('-interpolate')
	    args.push('bicubic')
	    args.push('-strip')
	    args.push('-thumbnail')
	    args.push(resizewidth + 'x' + resizeheight)
	    args.push('-crop')
	    args.push(options.width + 'x'+ options.height + '+' + options.x + '+' + options.y)
	    if (options.quality) {
	    	args.push('-quality')
	    	args.push(options.quality)
	    }
			if (options.background) {
				args.push('-background')
				args.push(options.background)
			}
	    args.push(options.dst)

			child = exec('convert', args, function(err, stdout, stderr) {
				if (err) return deferred.reject(err);
				deferred.resolve(info(options.dst));
			});

		}, function (err) { deferred.reject(err); });

	}

	directoryCheck(options, imgThumbnail)
	return deferred.promise;
};

// issue your own ImageMagick command
exports.exec = function(cmd) {

	var deferred = Q.defer();

	process.nextTick(function () {

		child = command(cmd, function(err, stdout, stderr) {
			if (err) return deferred.reject(err);
			deferred.resolve(stdout);
		});

	})

	return deferred.promise;
};
