/**
 * Executes a command with arguments and returns the stdout and stderr.
 *
 * @param {string} command the command to run (convert, identify, etc).
 * @param {string[]} args
 * @returns {Promise<IImageMagickCommandResult>}
 */
export declare function execute(command: string, args: string[]): Promise<IImageMagickCommandResult>;
/**
 * Returns the latest available version of ImageMagick
 *
 * @returns {number}
 */
export declare function getImageMagickVersion(): number;
export interface IImageMagickCommandResult {
    stdout: string;
    stderr: string;
}
