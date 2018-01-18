export interface IBaseOptions {
    /**
     * Source file.
     */
    src: string;
    /**
     * Destination file.
     * @default A temporary file
     */
    dst?: string;
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
    coalesce?: boolean;
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
