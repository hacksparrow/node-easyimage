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

import {crop} from "../../src/commands/crop";

chai.use(chaiAsPromised);
chai.should();

const files = `${__dirname}/../files`;
const output = `${__dirname}/../output`;

describe("crop command", () => {
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

    describe("to square (only cropWidth)", () => {
        it("should crop an image to smaller size", async () => {
            const info = await crop({
                src: `${files}/wide.png`,
                dst: `${output}/test.png`,
                cropWidth: 50,
            });

            info.width.should.be.equal(50);
            info.height.should.be.equal(50);
        });

        it("shouldn't crop to larger", async () => {
            const info = await crop({
                src: `${files}/wide.png`,
                dst: `${output}/test.png`,
                cropWidth: 500,
            });

            info.width.should.be.equal(400);
            info.height.should.be.equal(200);
        });
    });

    describe("to rectangle (both cropWidth and cropHeight)", () => {
        it("should crop an image to smaller size", async () => {
            const info = await crop({
                src: `${files}/wide.png`,
                dst: `${output}/test.png`,
                cropWidth: 50,
                cropHeight: 75,
            });

            info.width.should.be.equal(50);
            info.height.should.be.equal(75);
        });
    });
});
