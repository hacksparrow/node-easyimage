var easyimg = require('./easyimage.js');

var srcimg = 'kitten.jpg';

easyimg.info(srcimg, function(err, stdout, stderr) {
	if (err) throw err;
	console.log(stdout);
});

// test for info on a non image
easyimg.info('./test.js', function(err,stdout,stderr) {
	  console.log('Next line should be unsupported error');
	  console.log(err);
});


easyimg.convert({src:srcimg, dst:'./output/convert.png', quality:10}, function(err, image) {
	if (err) throw err;
	console.log('Converted');
	console.log(image);
});


easyimg.resize({src:srcimg, dst:'./output/resize.jpg', width:640, height:480}, function(err, image) {
	if (err) throw err;
	console.log('Resized');
	console.log(image);
});


easyimg.crop(
	{
		src:srcimg, dst:'./output/crop.jpg',
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
		src:srcimg, dst:'./output/thumbnail.jpg',
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
		src:srcimg, dst:'./output/rescrop.jpg',
		width:400, height:5400,
		cropwidth:100, cropheight:100,
		x:0, y:0
	},
	function(err, image) {
		if (err) throw err;
		console.log('Resized and cropped');
		console.log(image);
	}
);

easyimg.exec('convert '+ srcimg +' ./output/command.gif', function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Command executed');
});
