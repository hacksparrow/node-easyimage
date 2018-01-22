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

import {resize} from "../../src/commands/resize";

chai.use(chaiAsPromised);
chai.should();

const files = `${__dirname}/../files`;
const output = `${__dirname}/../output`;

describe("resize command", () => {
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

    describe("with keeping aspect ratio", async () => {
        describe("with only width", () => {
            it("should make smaller image", async () => {
                const wideInfo = await resize({
                    dst: `${output}/wide.png`,
                    src: `${files}/wide.png`,
                    width: 50,
                });
                const tallInfo = await resize({
                    dst: `${output}/tall.png`,
                    src: `${files}/tall.png`,
                    width: 50,
                });

                wideInfo.width.should.equal(50);
                wideInfo.height.should.equal(25);

                tallInfo.width.should.equal(50);
                tallInfo.height.should.equal(100);
            });

            it("should make larger image", async () => {
                const wideInfo = await resize({
                    dst: `${output}/wide.png`,
                    src: `${files}/wide.png`,
                    width: 500,
                });
                const tallInfo = await resize({
                    dst: `${output}/tall.png`,
                    src: `${files}/tall.png`,
                    width: 500,
                });

                wideInfo.width.should.equal(500);
                wideInfo.height.should.equal(250);

                tallInfo.width.should.equal(500);
                tallInfo.height.should.equal(1000);
            });
        });

        describe("with width and height", () => {
            it("should make smaller image", async () => {
                const wideInfo = await resize({
                    dst: `${output}/wide.png`,
                    height: 100,
                    src: `${files}/wide.png`,
                    width: 100,
                });
                const tallInfo = await resize({
                    dst: `${output}/tall.png`,
                    height: 100,
                    src: `${files}/tall.png`,
                    width: 100,
                });

                wideInfo.width.should.equal(100);
                wideInfo.height.should.equal(50);

                tallInfo.width.should.equal(50);
                tallInfo.height.should.equal(100);
            });

            it("should make larger image", async () => {
                const wideInfo = await resize({
                    dst: `${output}/wide.png`,
                    height: 500,
                    src: `${files}/wide.png`,
                    width: 500,
                });
                const tallInfo = await resize({
                    dst: `${output}/tall.png`,
                    height: 500,
                    src: `${files}/tall.png`,
                    width: 500,
                });

                wideInfo.width.should.equal(500);
                wideInfo.height.should.equal(250);

                tallInfo.width.should.equal(250);
                tallInfo.height.should.equal(500);
            });
        });
    });

    describe("without keeping aspect ratio", async () => {
        describe("with width and height", () => {
            it("should make smaller image", async () => {
                const wideInfo = await resize({
                    dst: `${output}/wide.png`,
                    height: 100,
                    ignoreAspectRatio: true,
                    src: `${files}/wide.png`,
                    width: 100,
                });
                const tallInfo = await resize({
                    dst: `${output}/tall.png`,
                    height: 100,
                    ignoreAspectRatio: true,
                    src: `${files}/tall.png`,
                    width: 100,
                });

                wideInfo.width.should.equal(100);
                wideInfo.height.should.equal(100);

                tallInfo.width.should.equal(100);
                tallInfo.height.should.equal(100);
            });

            it("should make larger image", async () => {
                const wideInfo = await resize({
                    dst: `${output}/wide.png`,
                    height: 500,
                    ignoreAspectRatio: true,
                    src: `${files}/wide.png`,
                    width: 500,
                });
                const tallInfo = await resize({
                    dst: `${output}/tall.png`,
                    height: 500,
                    ignoreAspectRatio: true,
                    src: `${files}/tall.png`,
                    width: 500,
                });

                wideInfo.width.should.equal(500);
                wideInfo.height.should.equal(500);

                tallInfo.width.should.equal(500);
                tallInfo.height.should.equal(500);
            });
        });
    });

    describe("with only downscaling", () => {
        it("should make a smaller image", async () => {
            const wideInfo = await resize({
                dst: `${output}/wide.png`,
                height: 50,
                onlyDownscale: true,
                src: `${files}/wide.png`,
                width: 50,
            });
            const tallInfo = await resize({
                dst: `${output}/tall.png`,
                height: 50,
                onlyDownscale: true,
                src: `${files}/tall.png`,
                width: 50,
            });

            wideInfo.width.should.equal(50);
            wideInfo.height.should.equal(25);

            tallInfo.width.should.equal(25);
            tallInfo.height.should.equal(50);
        });

        it("shouldn't make larger image", async () => {
            const wideInfo = await resize({
                dst: `${output}/wide.png`,
                height: 500,
                onlyDownscale: true,
                src: `${files}/wide.png`,
                width: 500,
            });
            const tallInfo = await resize({
                dst: `${output}/tall.png`,
                height: 500,
                onlyDownscale: true,
                src: `${files}/tall.png`,
                width: 500,
            });

            wideInfo.width.should.equal(400);
            wideInfo.height.should.equal(200);

            tallInfo.width.should.equal(200);
            tallInfo.height.should.equal(400);
        });
    });
});
