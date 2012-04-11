var easyimg = require('easyimage');

var srcimg = 'sample-images/thed.jpg';

easyimg.info(srcimg, function(err, stdout, stderr) {
	if (err) throw err;
	console.log(stdout);
});


easyimg.convert({src:srcimg, dst:'convert.png', quality:10}, function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Converted');
});


easyimg.resize({src:srcimg, dst:'resize.jpg', width:640, height:480}, function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Resized');
});


easyimg.crop(
	{
		src:srcimg, dst:'crop.jpg',
		cropwidth:128, cropheight:128,
		gravity:'North',
		x:0, y:0
	},
	function(err, stdout, stderr) {
		if (err) throw err;
		console.log('Cropped');
	}
);

easyimg.thumbnail(
	{
		src:srcimg, dst:'thumbnail.jpg',
		width:128, height:128,
		x:0, y:0
	},
	function(err, stdout, stderr) {
		if (err) throw err;
		console.log('Thumbnail created');
	}
);

easyimg.rescrop(
	{
		src:srcimg, dst:'rescrop.jpg',
		width:500, height:500,
		cropwidth:128, cropheight:128,
		x:0, y:0
	},
	function(err, stdout, stderr) {
		if (err) throw err;
		console.log('Resized and cropped');
	}
);

easyimg.exec('convert '+ srcimg +' command.gif', function(err, stdout, stderr) {
	if (err) throw err;
	console.log('Command executed');
});
