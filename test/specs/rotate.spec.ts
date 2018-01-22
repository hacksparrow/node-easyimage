/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */

import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {mkdir} from "fs";
import "mocha";
import * as rimraf from "rimraf";

import {rotate} from "../../src/commands/rotate";

chai.use(chaiAsPromised);
chai.should();

const files = `${__dirname}/../files`;
const output = `${__dirname}/../output`;

describe("rotate command", () => {
    beforeEach((done: () => void) => {
        try {
            mkdir(output, done);
        } catch (e) {
            done();
        }
    });

    afterEach((done: () => void) => {
        rimraf(output, done);
    });

    it("should rotate an image", async () => {
        const info = await rotate({
            degree: 90,
            dst: `${output}/wide.png`,
            src: `${files}/wide.png`,
        });

        info.width.should.equal(200);
        info.height.should.equal(400);
    });
});
