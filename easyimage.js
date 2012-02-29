var exec = require('child_process').exec;
var child;
var imcmd; // short for ImageMagick Command, how ingenious (y)

// treasure of error messages
var error_messages = {
	'path': 'Missing image paths.\nMake sure both source and destination files are specified.',	
	'dim': 'Missing dimensions.\nSpecify the width atleast.',
	'restricted': 'The command you are trying to execute is prohibited.'
};

// function to throw errors at unsuspecting and potentially innocent developers
var throw_err = function(type) { throw(error_messages[type]); };

// get basic information about an image file
exports.info = function(file, callback) {
	imcmd = 'identify ' + file.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	child = exec(imcmd, function(err, stdout, stderr) {
		var info = {};
		var temp = stdout.split(' ');
		info.name = temp[0];
		info.type = temp[1];
		var dim = temp[2].split('x');
		info.width = dim[0];
		info.height = dim[1];
		info.depth = temp[4];
		info.size = temp[6];
		callback(err, info, stderr);
	});
};

// convert a file type to another
exports.convert = function(options, callback) {
	if (options.src === undefined || options.dst === undefined) throw_err('path');
	options.src = options.src.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	options.dst = options.dst.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	if (options.quality === undefined) imcmd = 'convert ' + options.src + ' ' + options.dst;
	else imcmd = 'convert ' + options.src + ' -quality ' + options.quality + ' ' + options.dst;
	child = exec(imcmd, function(err, stdout, stderr) {
		callback(err, stdout, stderr);
	});
};

// resize an image
exports.resize = function(options, callback) {
	if (options.src === undefined || options.dst === undefined) throw_err('path');
	if (options.width === undefined) throw_err('dim'); 
	options.height = options.height || options.width;
	options.src = options.src.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	options.dst = options.dst.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	if (options.quality === undefined) imcmd = 'convert ' + options.src + ' -resize '+options.width + 'x' + options.height + ' ' + options.dst;
	else imcmd = 'convert ' + options.src + ' -resize '+options.width + 'x' + options.height + ' -quality ' + options.quality + ' ' + options.dst;
	child = exec(imcmd, function(err, stdout, stderr) {
		callback(err, stdout, stderr);
	});
};

// crop an image
exports.crop = function(options, callback) {
	if (options.src === undefined || options.dst === undefined) throw_err('path');
	if (options.cropwidth === undefined) throw_err('dim'); 
	options.cropheight = options.cropheight || options.cropwidth;
	options.gravity = options.gravity || 'Center';
	options.x = options.x || 0;
	options.y = options.y || 0;
	options.src = options.src.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	options.dst = options.dst.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	if (options.quality === undefined) imcmd = 'convert ' + options.src + ' -gravity ' + options.gravity + ' -crop '+ options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y + ' ' + options.dst;
	else  imcmd = 'convert ' + options.src + ' -gravity ' + options.gravity + ' -crop '+ options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y + ' -quality ' + options.quality + ' ' + options.dst;
	child = exec(imcmd, function(err, stdout, stderr) {
		callback(err, stdout, stderr);
	});
};

// resize and crop in one shot!
exports.rescrop = function(options, callback) {
	if (options.src === undefined || options.dst === undefined) throw_err('path');
	if (options.width === undefined) throw_err('dim'); 
	options.height = options.height || options.width;
	
	options.cropwidth == options.cropwidth || options.width;
	options.cropheight == options.cropheight || options.height;
	
	options.gravity = options.gravity || 'Center';
	options.x = options.x || 0;
	options.y = options.y || 0;
	options.src = options.src.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	options.dst = options.dst.replace(' ', '\\ ').replace('(', '\\(').replace(')', '\\)');
	if (options.quality === undefined) imcmd = 'convert ' + options.src + ' -resize ' + options.width + 'x' + options.height + ' -gravity ' + options.gravity + ' -crop '+ options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y + ' ' + options.dst;
	else imcmd = 'convert ' + options.src + ' -resize ' + options.width + 'x' + options.height + ' -gravity ' + options.gravity + ' -crop '+ options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y + ' -quality ' + options.quality + ' ' + options.dst;
	child = exec(imcmd, function(err, stdout, stderr) {
		callback(err, stdout, stderr);
	});
};


// for the hardcore types - issue your own ImageMagick command
exports.exec = function(command, callback) {
	var _command = command.split(' ')[0];
	// as a security measure, we will allow only 'convert' commands
	if (_command != 'convert') throw_error('restricted');
	
	child = exec(command, function(err, stdout, stderr) { callback(err, stdout, stderr); });
};

