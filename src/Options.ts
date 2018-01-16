/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */

export interface IBaseOptions {
    /**
     * Source file.
     */
    src: string;

    /**
     * Destination file.
     * @default A temporary file
     */
    dst: string;

    /**
     * Auto orientate the image.
     * @default true
     */
    autoOrient?: boolean;

    /**
     * Applies the "-coalesce" option.
     * @default false
     * @see https://www.imagemagick.org/script/command-line-options.php#coalesce
     */
    coalesce?: boolean

    /**
     * Flatten the resulting image.
     * @default false
     */
    flatten?: boolean;

    /**
     * Apply a background color.
     */
    background?: string;

    /**
     * Set the output quality.
     * @type number 1-100
     */
    quality?: number;
}
