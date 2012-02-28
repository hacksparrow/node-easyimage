var easyim = require('easyimage');

easyim.info('sample-images/kitten.jpg', function(err, stdout, stderr) {
	if (err) throw err;
	console.log(stdout);
});


easyim.convert({src:'sample-images/kitten.jpg', dst:'kitten.png', quality:10}, function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Converted');
});


easyim.resize({src:'sample-images/kitten.jpg', dst:'kitten-small.jpg', width:640, height:480}, function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Resized');
});

easyim.crop(
	{
		src:'sample-images/kitten.jpg', dst:'kitten.jpg',
		cropwidth:128, cropheight:128,
		gravity:'North',
		x:0, y:0
	},
	function(err, stdout, stderr) {
		if (err) throw err;
		console.log('Cropped');
	}
);

easyim.rescrop(
	{
		src:'sample-images/kitten.jpg', dst:'kitten-thumbnail.jpg',
		width:500, height:500,
		cropwidth:128, cropheight:128,
		x:0, y:0
	},
	function(err, stdout, stderr) {
		if (err) throw err;
		console.log('Resized and cropped');
	}
);

easyim.exec('convert sample-images/kitten.jpg kitten.gif', function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Command executed');
});
