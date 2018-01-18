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
import {mkdir, unlink} from "fs";

import {convert} from "../../src/commands/convert";

chai.use(chaiAsPromised);
chai.should();

const files = `${__dirname}/../files`;
const output = `${__dirname}/../output`;

describe("convert command", () => {
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

    describe("with image source", () => {
        it("should convert to image", async () => {
            const info = await convert({
                src: `${files}/wide.jpg`,
                dst: `${output}/test.png`,
            });

            info.should.be.an("object");
            info.should.have.property("type");
            info.should.have.property("name");
            info.type.should.be.equal("png");
            info.name.should.be.equal("test.png");
        });

        it("should convert to pdf", async () => {
            const info = await convert({
                src: `${files}/wide.jpg`,
                dst: `${output}/test.pdf`,
            });

            info.should.be.an("object");
            info.should.have.property("type");
            info.should.have.property("name");
            info.type.should.be.equal("pdf");
            info.name.should.be.equal("test.pdf");
        });
    });

    describe("with pdf source", () => {
        it("should convert one page to image", async () => {
            const info = await convert({
                src: `${files}/test.pdf[1]`,
                dst: `${output}/test.png`,
            });

            info.should.be.an("object");
            info.should.have.property("type");
            info.should.have.property("name");
            info.should.have.property("height");
            info.type.should.be.equal("png");
            info.name.should.be.equal("test.png");
            info.height.should.be.equal(792);

        });

        it("should convert all pages to image", async () => {
            const info = await convert({
                src: `${files}/test.pdf`,
                dst: `${output}/test.png`,
            });

            info.should.be.an("object");
            info.should.have.property("type");
            info.should.have.property("name");
            info.should.have.property("height");
            info.type.should.be.equal("png");
            info.name.should.be.equal("test.png");
            info.height.should.be.equal(1584);
        });
    });

    describe("to temporary file", () => {
        let fullPath: string = null;
        afterEach((done: () => void) => {
            if (fullPath) {
                unlink(fullPath, done);
                fullPath = null;
            }
        });

        it("should create temporary dst file", async () => {
            const info = await convert({
                src: `${files}/wide.jpg`,
            });

            fullPath = info.path;

            info.should.be.an("object");
            info.should.have.property("type");
            info.should.have.property("name");
            info.type.should.be.equal("jpeg");
            /EasyImage-.+\.jpg/.test(info.name).should.be.true;
        });
    });
});
