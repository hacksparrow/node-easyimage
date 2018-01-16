"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ImageMagickMissingError = (function (_super) {
    __extends(ImageMagickMissingError, _super);
    function ImageMagickMissingError() {
        return _super.call(this, "ImageMagick not found") || this;
    }
    return ImageMagickMissingError;
}(Error));
exports.ImageMagickMissingError = ImageMagickMissingError;
