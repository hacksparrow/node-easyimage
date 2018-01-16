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
$ npm install --save easyimage
```

## Usage

The EasyImage module is ES6 compatible. You can import just the commands that you will need.

Except for `info` and `execute`, all commands take an options object.

### Info

The `info` command will give you details about an image file.

```ecmascript 6
import {info} from "easyimage";

info("/path/to/image.jpg").then((info) => console.log(info));
```

### Convert

The `convert` command can convert an image file from one type to another.

```ecmascript 6
import {convert} from "easyimage";

const options = {
    src: "/path/to/source.jpg",
    dst: "/path/to/dest.png"
};

convert(options).then((info) => console.log(info));
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
