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
var UnsupportedError = /** @class */ (function (_super) {
    tslib_1.__extends(UnsupportedError, _super);
    function UnsupportedError(err) {
        return _super.call(this, "The issued command is unsupported: " + err) || this;
    }
    return UnsupportedError;
}(Error));
exports.UnsupportedError = UnsupportedError;
