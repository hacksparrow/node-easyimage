EasyImage [![NPM version](https://badge.fury.io/js/easyimage.svg)](https://badge.fury.io/js/easyimage)
=========

EasyImage is a promise-based image processing module for Node.js, it is built on top of ImageMagick, so make sure ImageMagick is installed on your system.

On Ubuntu
```
$ apt-get install imagemagick
```
On Mac OS X
```
$ brew install imagemagick
```
On CentOS
```
$ yum install imagemagick
```

## Installation
```
$ npm install easyimage
```

## Usage
```
var easyimg = require('easyimage');
```

EasyImage offers these promise methods:

```
easyimg.info(<image_path>) - to retrieve information about an image. Will return an object with the following properties - type, depth, width, height, size, density, name, and path.
easyimg.convert(<options>) - to convert an image from one format to another.
easyimg.resize(<options>) - to resize an image.
easyimg.crop(<options>) - to crop an image.
easyimg.thumbnail(<options>) - to create square thumbnails.
easyimg.rescrop(<options>) - to resize and crop and image in one go, useful for creating customzied thumbnails.
easyimg.rotate(<options>) - to rotate an image.
easyimg.execute(<command>, <arguments>) - when you want to call a custom command to ImageMagick. Pass arguments as an array.
```
**NOTE**: `easyimg.exec()` spawns a subshell, and has been deprecated. It can not detect the version of ImageMagick to ensure proper execution. Please use the `easyimg.execute()` function moving forward.

The EasyImage options object can have these properties depending on the method. Unrelated options are ignored.

```
src - path to source image.
dst - path to destination image.
width - width of resized image.
height - height of resized image.
degree - degree of rotation.
cropwidth - width of cropped image, if missing, width will be used instead.
cropheight - height of cropped image, if missing, height will be used instead.
x - x offset for cropping, defaults to 0.
y - y offset for cropping, defaults to 0.
quality - quality of processed image, 1 to 100.
gravity - crop position [NorthWest | North | NorthEast | West | Center | East | SouthWest | South | SouthEast], defaults to Center.
fill - fill area flag, image is resized to completely fill the target crop dimensions, defaults to false.
background - background color, defaults to "white". If specified, automatically flattens the image.
flatten - if present, the image will be flattened (flattening removes alpha channel). Defaults to false.
ignoreAspectRatio - if set to true, resize will ignore aspect ratio
```

## Examples

**Example 1: File info**
```
easyimg.info('kitten.jpg').then(
  function(file) {
    console.log(file);
  }, function (err) {
    console.log(err);
  }
);
```

The first function of the `then` method is the success handler, the second function is the error handler.

**Example 2: Resize and Crop**
```
easyimg.rescrop({
     src:'kitten.jpg', dst:'./output/kitten-thumbnail.jpg',
     width:500, height:500,
     cropwidth:128, cropheight:128,
     x:0, y:0
  })
  .then(function(image) {
     console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
  })
  .catch(function (err) {
    console.log(err);
  }
);
```
For more examples check out [test/test.js](https://github.com/hacksparrow/node-easyimage/blob/master/test/test.js).

## License (MIT)

Copyright (c) 2015 Hage Yaapa <[http://www.hacksparrow.com](http://www.hacksparrow.com)>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
