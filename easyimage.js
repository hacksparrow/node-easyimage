var exec = require('child_process').exec;
var child;
var imcmd; // short for ImageMagick Command, how ingenious (y)

// treasure of error messages
var error_messages = {
	'path': 'Missing image paths.\nMake sure both source and destination files are specified.',	
	'dim': 'Missing dimensions.\nSpecify the width atleast.',
	'restricted': 'The command you are trying to execute is prohibited.',
	'unsupported': 'File not supported.',
};

// function to throw errors at unsuspecting and potentially innocent developers
var throw_err = function(type) { throw(error_messages[type]); };

// general info function
function info(file, callback) {
	file = quoted_name(file);
	// %z = depth, %m = type, %w = width, %h = height, %b = filesize in byte, %f = filename
	imcmd = 'identify -format "%m %z %w %h %b %f" ' + file;
	
	child = exec(imcmd, function(err, stdout, stderr) {
		var info = {};
		//Basic error handling:
		if (stderr.match(/^identify:/)) throw_err('unsupported');
		var temp = stdout.split(' ');

		//Basic error handling:
		if (temp.length < 6) throw_err('unsupported'); 
		 
		
		info.type   = temp[0].toString();
		info.depth  = temp[1].toString();
		info.width  = temp[2].toString();
		info.height = temp[3].toString();
		info.size   = temp[4].toString();
		info.name   = temp.slice(5).join(' ').replace(/(\r\n|\n|\r)/gm,'');
		
		callback(err, info, stderr);
	});
}

// function to quote file names, if not already
function quoted_name(name) {
	if (name[0] != '"') name = '"' + name;
	if (name[name.length - 1] != '"') name = name + '"';
	return name;
};


// get basic information about an image file
exports.info = function(file, callback) {
	info(file, callback);
};

// convert a file type to another
exports.convert = function(options, callback) {
	if (options.src === undefined || options.dst === undefined) throw_err('path');
	options.src = quoted_name(options.src);
	options.dst = quoted_name(options.dst);
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
	options.src = quoted_name(options.src);
	options.dst = quoted_name(options.dst);
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
	options.src = quoted_name(options.src);
	options.dst = quoted_name(options.dst);
	
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
	options.src = quoted_name(options.src);
	options.dst = quoted_name(options.dst);
	if (options.quality === undefined) imcmd = 'convert ' + options.src + ' -resize ' + options.width + 'x' + options.height + ' -gravity ' + options.gravity + ' -crop '+ options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y + ' ' + options.dst;
	else imcmd = 'convert ' + options.src + ' -resize ' + options.width + 'x' + options.height + ' -gravity ' + options.gravity + ' -crop '+ options.cropwidth + 'x'+ options.cropheight + '+' + options.x + '+' + options.y + ' -quality ' + options.quality + ' ' + options.dst;
	child = exec(imcmd, function(err, stdout, stderr) {
		callback(err, stdout, stderr);
	});
};

// create thumbnails
exports.thumbnail = function(options, callback) {
	
	if (options.src === undefined || options.dst === undefined) throw_err('path');
	if (options.width === undefined) throw_err('dim'); 
	options.height = options.height || options.width;
	options.gravity = options.gravity || 'Center';
	options.x = options.x || 0;
	options.y = options.y || 0;
	options.src = quoted_name(options.src);
	options.dst = quoted_name(options.dst);
	
	info(options.src, function(err, original, stderr) {
		if (err) throw err;
		
		// dimensions come as strings, convert them to number
		original.width = +original.width;
		original.height = +original.height;
		
		var resizewidth = options.width;
		var resizeheight = options.height;
		
		if (original.width > original.height) { resizewidth = ''; }
		else if (original.height > original.width) { resizeheight = ''; }
		
		// resize and crop
		if (options.quality === undefined) imcmd = 'convert ' + options.src + ' -resize ' + resizewidth + 'x' + resizeheight + ' -gravity ' + options.gravity + ' -crop '+ options.width + 'x'+ options.height + '+' + options.x + '+' + options.y + ' ' + options.dst;
		else imcmd = 'convert ' + options.src + ' -resize '+ resizewidth + 'x' + resizeheight + ' -quality ' + options.quality + ' -gravity ' + options.gravity + ' -crop '+ options.width + 'x'+ options.height + '+' + options.x + '+' + options.y + ' -quality ' + options.quality + ' ' + options.dst;
		
		child = exec(imcmd, function(err, stdout, stderr) {
			if (err) throw err;
				callback(err, stdout, stderr);
		});

	});
};

// for the hardcore types - issue your own ImageMagick command
exports.exec = function(command, callback) {
	var _command = command.split(' ')[0];
	// as a security measure, we will allow only 'convert' commands
	if (_command != 'convert') throw_error('restricted');
	
	child = exec(command, function(err, stdout, stderr) { callback(err, stdout, stderr); });
};

