/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */

export * from "./execute";
export * from "./commands/info";
export * from "./commands/crop";
export * from "./commands/convert";
export * from "./commands/resize";
export * from "./commands/rotate";
export * from "./commands/rescrop";
export * from "./commands/thumbnail";

export * from "./errors/BadDestinationError";
export * from "./errors/ImageMagickMissingError";
export * from "./errors/MissingExtensionError";
export * from "./errors/MissingOptionsError";
export * from "./errors/UnsupportedError";
