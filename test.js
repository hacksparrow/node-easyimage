var easyimg = require('easyimage');

easyimg.info('sample-images/cute kitten.jpg', function(err, stdout, stderr) {
	if (err) throw err;
	console.log(stdout);
});


easyimg.convert({src:'sample-images/cute kitten.jpg', dst:'cute kitten.png', quality:10}, function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Converted');
});


easyimg.resize({src:'sample-images/cute kitten.jpg', dst:'kitten-small.jpg', width:640, height:480}, function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Resized');
});

easyimg.crop(
	{
		src:'sample-images/cute kitten.jpg', dst:'cute kitten.jpg',
		cropwidth:128, cropheight:128,
		gravity:'North',
		x:0, y:0
	},
	function(err, stdout, stderr) {
		if (err) throw err;
		console.log('Cropped');
	}
);

easyimg.rescrop(
	{
		src:'sample-images/cute kitten.jpg', dst:'kitten-thumbnail.jpg',
		width:500, height:500,
		cropwidth:128, cropheight:128,
		x:0, y:0
	},
	function(err, stdout, stderr) {
		if (err) throw err;
		console.log('Resized and cropped');
	}
);

easyimg.exec('convert sample-images/cute\\ kitten.jpg cute\\ kitten.gif', function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Command executed');
});
