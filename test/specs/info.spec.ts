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

import {info} from "../../src/commands/info";

chai.use(chaiAsPromised);
chai.should();

const files = `${__dirname}/../files`;

describe("info command", () => {

    it("should return all fields", async () => {
        const fileInfo = await info(`${files}/wide.png`);

        fileInfo.should.be.an("object");
        fileInfo.should.have.property("type");
        fileInfo.should.have.property("depth");
        fileInfo.should.have.property("width");
        fileInfo.should.have.property("height");
        fileInfo.should.have.property("size");
        fileInfo.should.have.property("density");
        fileInfo.should.have.property("orientation");
        fileInfo.should.have.property("name");
        fileInfo.should.have.property("path");
        fileInfo.density.should.have.property("x");
        fileInfo.density.should.have.property("y");

        fileInfo.type.should.equal("png");
        fileInfo.depth.should.equal(8);
        fileInfo.width.should.equal(400);
        fileInfo.height.should.equal(200);
        fileInfo.size.should.closeTo(3565, 10);
        fileInfo.density.x.should.equal(28.35);
        fileInfo.density.y.should.equal(28.35);
        fileInfo.orientation.should.equal("Undefined");
        fileInfo.name.should.equal("wide.png");
        fileInfo.path.should.equal(`${files}/wide.png`);
    });
});
