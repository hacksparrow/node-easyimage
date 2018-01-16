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

EasyImage 3 is only compatible with NodeJS 4 or greater.

```
$ npm install --save easyimage
```

For NodeJS 0.12, use [EasyImage 2](https://github.com/hacksparrow/node-easyimage/tree/v2.2.0)

```
$ npm install --save easyimage@2
```

## Usage

The EasyImage module is ES6 compatible. You can import just the commands that you will need.

Every command which takes an options object which extends from [IBaseOptions](https://mrkmg.github.io/node-easyimage/interfaces/ibaseoptions.html). You can use
any of the parameters defined on `IBaseOptions`. For example, to prevent EasyImage from auto-orientating your image, you can pass `autoOrient: false` on any
command.

Every command must have a `src` parameter. If you do not specify a `dst`, then a random file will be created. Be sure to clean up randomly created files by
either moving them to permanent storage, or deleting them. Some command have other required options.

The examples below only specify the required arguments. See the [Docs](https://mrkmg.github.io/node-easyimage/index.html) for all available options for each
command.

### Convert

The [convert()](http://localhost:63342/node-easyimage/docs/globals.html#convert) command can convert an image file from one type to another.

```
import {convert} from "easyimage";

const options = {
    src: "/path/to/source.jpg",
    dst: "/path/to/dest.png"
};

const info = await convert(options);
```

### Crop

The [crop()](https://mrkmg.github.io/node-easyimage/globals.html#crop) command will crop an image to the specified size.

```
import {crop} from "easyimage";

const options = {
    src: "/path/to/source.jpg",
    dst: "/path/to/dest.jpg",
    cropWidth: 100
};

const info = await crop(options)
```

### Resize

The [resize()](https://mrkmg.github.io/node-easyimage/globals.html#resize) command will resize an image to the specified size.

```
import {resize} from "easyimage";

const options = {
    src: "/path/to/source.jpg",
    dst: "/path/to/dest.jpg",
    width: 100
};

const info = await resize(options)
```

### Rescrop

The [rescrop()](https://mrkmg.github.io/node-easyimage/globals.html#rescrop) command will resize and crop an image to the specified size.

```
import {rescrop} from "easyimage";

const options = {
    src: "/path/to/source.jpg",
    dst: "/path/to/dest.jpg",
    width: 100,
    cropWidth: 200
};

const info = await rescrop(options)
```

### Rotate

The [rotate()](https://mrkmg.github.io/node-easyimage/globals.html#rotate) command will rotate an image by the specified number of degrees.

```
import {rotate} from "easyimage";

const options = {
    src: "/path/to/source.jpg",
    dst: "/path/to/dest.jpg",
    degree: 90
};

const info = await rotate(options)
```

### Thumbnail

The [thumbnail()](https://mrkmg.github.io/node-easyimage/globals.html#thumbnail) command will create a thumbnail of the specified image.

```
import {thumbnail} from "easyimage";

const options = {
    src: "/path/to/source.jpg",
    dst: "/path/to/dest.jpg",
    width: 100
};

const info = await thumbnail(options)
```

## Helper Commands

In addition to the above commands, there are three other commands available.

### Info

The [info()](https://mrkmg.github.io/node-easyimage/globals.html#info) command will give you details about an image file.

```
import {info} from "easyimage";

const info = await info("/path/to/image.jpg")
```

### Execute

The [execute()]() command allows you directly run ImageMagick with your own tool and arguments. It will handle calling the appropriate ImageMagick version, and 
return the raw `stdout` and `stderr` to you.

```
import {execute} from "easyimage";

const {stdout, stderr} = await execute("convert", ["/path/to/source.jpg", "-flatten", "/path/to/dest.jpg"]);
``` 

### getImageMagickVersion

The [getImageMagickVersion()](https://mrkmg.github.io/node-easyimage/globals.html#getimagemagickversion) command will return the detected version of 
ImageMagick.

```
import {getImageMagickVersion} from "easyimage";

const version = getImageMagickVersion();
```

## Error Handling

There are 5 different types of errors that can be thrown.

- `BadDestinationError`
- `ImageMagickMissingError`
- `MissingExtensionError`
- `MissingOptionsError`
- `UnsupportedError`

You can try to catch for specific errors.

```
import {convert, MissingOptionsError} from "easyimage";

async function shouldError() {
    try {
        await convert({});
        console.log("I should not show");
    } catch (MissingOptionsError e) {
        console.log("I should show");
    } catch (Error e) {
        console.log("I should not show either");
    }
}

```

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
