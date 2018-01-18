import { IBaseOptions } from "./options";
export declare function ensureDestinationDirectoryExists(options: IBaseOptions): Promise<{}>;
export declare function applyDefaultsToBaseOptions(options: IBaseOptions): void;
export declare function applyBaseOptionsToArgs(options: IBaseOptions, args: string[]): void;
export declare function checkForMissingOptions<T extends IBaseOptions>(options: T, requiredArgs: Array<keyof T>): void;
