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
import * as EasyImage from "../../src/easyimage";

chai.use(chaiAsPromised);
chai.should();

describe("EasyImage Global", () => {
    it("should be an object", () => {
        EasyImage.should.be.an("object");
    });

    it("should export helper functions", () => {
        EasyImage.should.have.property("execute");
        EasyImage.should.have.property("getImageMagickVersion");

        EasyImage.execute.should.be.a("function");
        EasyImage.getImageMagickVersion.should.be.a("function");
    });

    it("should export commands", () => {
        EasyImage.should.have.property("convert");
        EasyImage.should.have.property("crop");
        EasyImage.should.have.property("info");
        EasyImage.should.have.property("rescrop");
        EasyImage.should.have.property("resize");
        EasyImage.should.have.property("rotate");

        EasyImage.convert.should.be.a("function");
        EasyImage.crop.should.be.a("function");
        EasyImage.info.should.be.a("function");
        EasyImage.rescrop.should.be.a("function");
        EasyImage.resize.should.be.a("function");
        EasyImage.rotate.should.be.a("function");

    });

    it("should export error constructors", () => {
        EasyImage.should.have.property("BadDestinationError");
        EasyImage.should.have.property("ImageMagickMissingError");
        EasyImage.should.have.property("MissingExtensionError");
        EasyImage.should.have.property("MissingOptionsError");
        EasyImage.should.have.property("UnsupportedError");

        EasyImage.BadDestinationError.should.be.a("function");
        EasyImage.ImageMagickMissingError.should.be.a("function");
        EasyImage.MissingExtensionError.should.be.a("function");
        EasyImage.MissingOptionsError.should.be.a("function");
        EasyImage.UnsupportedError.should.be.a("function");
    });
});
