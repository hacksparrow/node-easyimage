var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    chai.should();
var assert = chai.assert;
var expect = chai.expect;
var fs = require('fs');
var rimraf = require('rimraf');

var outputDir = './output';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

var easyimg = require('../easyimage.js');
var srcimg = 'kitten.jpg';

describe('.info - ', function () {

    describe('valid file type', function () {
        it('should show file info', function () {
            return easyimg.info(srcimg).then(function (file) {
                //console.log(file);
                file.should.be.an('object');
                file.should.have.property('name');
                file.name.should.be.a('string');
                file.should.have.property('path');
                file.path.should.be.a('string');
                file.should.have.property('type');
                file.type.should.be.a('string');
                file.should.have.property('width');
                file.width.should.be.a('number');
                file.should.have.property('height');
                file.height.should.be.a('number');
                file.should.have.property('depth');
                file.depth.should.be.a('number');
                file.should.have.property('size');
                file.size.should.be.a('number');
                file.should.have.property('density');
                file.density.should.be.an('object');
                file.density.should.have.property('x');
                file.density.x.should.be.a('number');
                file.density.should.have.property('y');
                file.density.y.should.be.a('number');
            })
        });
    });

    describe('invalid file type', function () {
        it('should not be supported', function () {
            return assert.isRejected(easyimg.info('./test.js'), /^identify/);
        });
    });

});

describe('.convert -', function () {

    afterEach(function(done) {
        fs.unlink(__dirname + '/output/convert.png', function() {
            /* ignore any error unlinking */
            done();
        });
    });

    it('should convert an image format to another', function () {

        return easyimg.convert({src:srcimg, dst: __dirname + '/output/convert.png', quality:10}).then(function (file) {
            file.should.be.a('object');
            file.should.have.property('type');
            file.type.should.be.equal('png');
            file.name.should.be.equal('convert.png');
        });

    });

});

describe('.rotate -', function () {

    afterEach(function(done) {
        fs.unlink(__dirname + '/output/rotated.jpg', function() {
            /* ignore any error unlinking */
            done();
        });
    });

    it('should rotate the image by 90 degree', function () {

        return easyimg.info(srcimg).then(function(info){
            info.should.have.property('width')
            info.should.have.property('height')

            // Mainly check only if width and height are swaped
            return easyimg.rotate({src:srcimg, dst: __dirname + '/output/rotated.jpg', degree: 90}).then(function (file) {
                file.should.be.a('object');
                file.name.should.be.equal('rotated.jpg');
                file.should.have.property('width');
                file.width.should.be.equal(info.height);
                file.height.should.be.equal(info.width);
            });
        })
    });

});

describe('.resize -', function () {

    afterEach(function(done) {
        fs.unlink(__dirname + '/output/resize.jpg', function() {
            /* ignore any error unlinking */
            done();
        });
    });

    it('should resize an image with preserved aspect ratio', function () {

        return easyimg.resize({src:srcimg, dst: __dirname + '/output/resize.jpg', width:640, height:400}).then(function (file) {
            file.should.be.a('object');
            file.should.have.property('width');
            /*
             * The original aspect ratio is equal ~1.333.
             * Imagemagick calculates it with the lowest common
             * denominator in our case the height, thats why it is
             * preserved and width will be adjusted as follow
             * 400 * 1.33 = ~533
             */
            file.width.should.be.equal(533);
            file.height.should.be.equal(400);
            file.name.should.be.equal('resize.jpg');
        });

    });

    it('should resize an image with ignored aspect ratio', function () {

        return easyimg.resize({src:srcimg, dst: __dirname + '/output/resize.jpg', width:640, height:400, ignoreAspectRatio: true}).then(function (file) {
            file.should.be.a('object');
            file.should.have.property('width');
            file.width.should.be.equal(640);
            file.height.should.be.equal(400);
            file.name.should.be.equal('resize.jpg');
        });

    });

});

describe('.crop -', function () {

    afterEach(function(done) {
        fs.unlink(__dirname + '/output/crop.jpg', function() {
            /* ignore any error unlinking */
            done();
        });
    });

    it('should crop an image', function () {

        return easyimg.crop({
            src:srcimg, dst: __dirname + '/output/crop.jpg',
            cropwidth:128, cropheight:128,
            gravity:'North',
            x:0, y:0
        }).then(function (file) {
            file.should.be.a('object');
            file.should.have.property('width');
            file.width.should.be.equal(128);
            file.name.should.be.equal('crop.jpg');
        });

    });

});

describe('.rescrop -', function () {

    afterEach(function(done) {
        fs.unlink(__dirname + '/output/rescrop.jpg', function() {
            /* ignore any error unlinking */
            done();
        });
    });

    it('should resize and crop', function () {

        return easyimg.rescrop({
            src:srcimg, dst: __dirname + '/output/rescrop.jpg',
            width:400, height:5400,
            cropwidth:100, cropheight:100,
            x:0, y:0
        }).then(function (file) {
            file.should.be.a('object');
            file.should.have.property('width');
            file.width.should.be.equal(100);
            file.name.should.be.equal('rescrop.jpg');
        });

    });

});

describe('.thumbnail -', function () {

    afterEach(function(done) {
        fs.unlink(__dirname + '/output/thumb nail.jpg', function() {
            /* ignore any error unlinking */
            done();
        });
    });

	//this.timeout(5000);
    it('should generate a thumbnail', function () {

        return easyimg.thumbnail({
            src:srcimg, dst: __dirname + '/output/thumb nail.jpg',
            width:128, height:128,
            x:0, y:0
        }).then(function (file) {
            file.should.be.a('object');
            file.should.have.property('width');
            file.width.should.be.equal(128);
            file.name.should.be.equal('thumb nail.jpg');
        });

    });

});


describe('.exec -', function () {

    afterEach(function(done) {
        fs.unlink(__dirname + '/output/hello kitty.gif', function() {
            /* ignore any error unlinking */
            done();
        });
    });

    it('should invoke `convert` command', function () {
        return easyimg.exec('convert '+ srcimg +' ./output/hello\\ kitty.gif').then(function (file) {
        });

    });

});


describe('additionals', function () {

    afterEach(function(done) {
        rimraf(__dirname + '/output/foo/', function() {
            done();
        });
    });

    //this.timeout(5000);
    it('should create directories if they do not exist', function () {

        return easyimg.thumbnail({
            src:srcimg, dst: __dirname + '/output/foo/bar/hey.jpg',
            width:128, height:128,
            x:0, y:0
        }).then(function (file) {
            file.should.be.a('object');
            file.name.should.be.equal('hey.jpg');
        });

    });

});
