var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
    chai.use(chaiAsPromised);
    chai.should();
var expect = chai.expect;
var fs = require('fs');

var outputDir = './output';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

var easyimg = require('./easyimage.js');
var srcimg = 'kitten.jpg';

describe('.info - ', function () {

    describe('valid file type', function () {
        it('should show file info', function () {
            return easyimg.info(srcimg);
        });
    });

    describe('invalid file type', function () {
        it('should not be supported', function () {
            return easyimg.info('./test.js').should.be.rejected;
        });
    });

});

describe('.convert -', function () {

    it('should convert an image format to another', function (done) {

        easyimg.convert({src:srcimg, dst:'./output/convert.png', quality:10}).then(function (file) {
            try {
                file.should.be.a('object');
                file.should.have.property('type');
                file.type.should.be.equal('PNG');
                file.name.should.be.equal('convert.png');
                done();
            }
            catch(e) { done(e); }
        }, function (err) { done(err); });

    });

});

describe('.resize -', function () {

    it('should resize an image', function (done) {

        easyimg.resize({src:srcimg, dst:'./output/resize.jpg', width:640, height:480}).then(function (file) {
            try {
                file.should.be.a('object');
                file.should.have.property('width');
                file.width.should.be.equal(640);
                file.name.should.be.equal('resize.jpg');
                done();
            }
            catch(e) { done(e); }
        }, function (err) { done(err); });

    });

});

describe('.crop -', function () {

    it('should crop an image', function (done) {

        easyimg.crop({
            src:srcimg, dst:'./output/crop.jpg',
            cropwidth:128, cropheight:128,
            gravity:'North',
            x:0, y:0
        }).then(function (file) {
            try {
                file.should.be.a('object');
                file.should.have.property('width');
                file.width.should.be.equal(128);
                file.name.should.be.equal('crop.jpg');
                done();
            }
            catch(e) { done(e); }
        }, function (err) { done(err); });

    });

});

describe('.rescrop -', function () {

    it('should resize and crop', function (done) {

        easyimg.rescrop({
            src:srcimg, dst:'./output/rescrop.jpg',
            width:400, height:5400,
            cropwidth:100, cropheight:100,
            x:0, y:0
        }).then(function (file) {
            try {
                file.should.be.a('object');
                file.should.have.property('width');
                file.width.should.be.equal(100);
                file.name.should.be.equal('rescrop.jpg');
                done();
            }
            catch(e) { done(e); }
        }, function (err) { done(err); });

    });

});

describe('.thumbnail -', function () {

	//this.timeout(5000);
    it('should generate a thumbnail', function (done) {

        easyimg.thumbnail({
            src:srcimg, dst:'./output/thumbnail.jpg',
            width:128, height:128,
            x:0, y:0
        }).then(function (file) {
            try {
                file.should.be.a('object');
                file.should.have.property('width');
                file.width.should.be.equal(128);
                file.name.should.be.equal('thumbnail.jpg');
                done();
            }
            catch(e) { done(e); }
        }, function (err) { done(err); });

    });

});

describe('.exec -', function () {

    it('should invoke `convert` command', function (done) {
        easyimg.exec('convert '+ srcimg +' ./output/command.gif').then(function (file) {
        	done();
        }, function (err) { done(err); });

    });

});

