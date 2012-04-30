var easyimg = require('./easyimage.js');

var srcimg = 'kitteh.jpg';

easyimg.info(srcimg, function(err, stdout, stderr) {
	if (err) throw err;
	console.log(stdout);
});


easyimg.convert({src:srcimg, dst:'convert.png', quality:10}, function(err, image) {
	if (err) throw err;
	console.log('Converted');
	console.log(image);
});


easyimg.resize({src:srcimg, dst:'resize.jpg', width:640, height:480}, function(err, image) {
	if (err) throw err;
	console.log('Resized');
	console.log(image);
});

easyimg.resize({src:srcimg, dst:'resize_width.jpg', width:500}, function(err, image) {
	if (err) throw err;
	console.log('Resized');
	console.log(image);
});

easyimg.resize({src:srcimg, dst:'resize_height.jpg', height:400}, function(err, image) {
	if (err) throw err;
	console.log('Resized');
	console.log(image);
});

easyimg.resize({src:srcimg, 
		dst:'resize_all_options.jpg', 
		width: 640, 
		height:480,
		colorspace: 'RGB',
		density: '72x72',
		strip: true,
		quality: 90
	       }, 
	       function(err, image) {
		   if (err) throw err;
		   console.log('Resized');
		   console.log(image);
	       });

easyimg.resize_if_bigger({src:srcimg, dst:'resize_if_bigger.jpg', width:640, height:480}, function(err, image) {
	if (err) throw err;
	console.log('Resized');
	console.log(image);
});

easyimg.resize_if_bigger({src:srcimg, dst:'resize_copied.jpg', width:5000, height:5000}, function(err, image) {
	if (err) throw err;
	console.log('Copied');
	console.log(image);
});

easyimg.crop(
	{
		src:srcimg, dst:'crop.jpg',
		cropwidth:128, cropheight:128,
		gravity:'North',
		x:0, y:0
	},
	function(err, image) {
		if (err) throw err;
		console.log('Cropped');
		console.log(image);
	}
);

easyimg.thumbnail(
	{
		src:srcimg, dst:'thumbnail.jpg',
		width:128, height:128,
		x:0, y:0
	},
	function(err, image) {
		if (err) throw err;
		console.log('Thumbnail created');
		console.log(image);
	}
);

easyimg.rescrop(
	{
		src:srcimg, dst:'rescrop.jpg',
		width:500, height:500,
		cropwidth:128, cropheight:128,
		x:0, y:0
	},
	function(err, image) {
		if (err) throw err;
		console.log('Resized and cropped');
		console.log(image);
	}
);

easyimg.exec('convert '+ srcimg +' command.gif', function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Command executed');
});
