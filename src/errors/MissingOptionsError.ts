/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */

export class MissingOptionsError extends Error {
    constructor(options: string[]) {
        super(`Missing ${options.map(o => "`" + o + "`").join(", ")} from options`);
    }
}
