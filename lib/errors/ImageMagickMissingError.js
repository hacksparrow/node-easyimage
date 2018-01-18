"use strict";
/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */
exports.__esModule = true;
var tslib_1 = require("tslib");
var ImageMagickMissingError = /** @class */ (function (_super) {
    tslib_1.__extends(ImageMagickMissingError, _super);
    function ImageMagickMissingError() {
        return _super.call(this, "ImageMagick not found") || this;
    }
    return ImageMagickMissingError;
}(Error));
exports.ImageMagickMissingError = ImageMagickMissingError;
