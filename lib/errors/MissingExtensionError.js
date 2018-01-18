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
var MissingExtensionError = /** @class */ (function (_super) {
    tslib_1.__extends(MissingExtensionError, _super);
    function MissingExtensionError(srcFile) {
        return _super.call(this, srcFile + " does not have an extension") || this;
    }
    return MissingExtensionError;
}(Error));
exports.MissingExtensionError = MissingExtensionError;
