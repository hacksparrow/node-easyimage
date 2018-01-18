/*
 EasyImage

 EasyImage is a promise-based image processing module
 for Node.js, it is built on top of ImageMagick, so
 make sure ImageMagick is installed on your system.

 Copyright (c) 2015 Hage Yaapa <http://www.hacksparrow.com>
 Maintained by Kevin Gravier <http://github.com/mrkmg>

 MIT License
 */

import "mocha";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as rimraf from "rimraf";
import {mkdir} from "fs";

import {rescrop} from "../../src/commands/rescrop";

chai.use(chaiAsPromised);
chai.should();

const files = `${__dirname}/../files`;
const output = `${__dirname}/../output`;

describe("rescrop command", () => {
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

    it("should resize and crop an image", async () => {
        const info = await rescrop({
            src: `${files}/wide.png`,
            dst: `${output}/wide.png`,
            width: 100,
            height: 100,
            cropWidth: 50,
        });

        info.width.should.equal(50);
        info.height.should.equal(50);
    });
});
