'use strict';
/*jshint expr: true*/


// Bring in modules we want to test with & to test
var expect = require('chai').expect;
var bmx = require('../bmx.js');
var transformer = bmx.transformer;
var transforms = bmx.transforms;
var fs = require('fs');
// var Buffer = require('buffer');

describe('bmx', function() {
  it('should have a package.json file', function(){
    var pkgJSON = fs.openSync('./package.json', 'r');
    expect(pkgJSON).to.exist;
  });
  it('should have a Gruntfile.js file', function(){
    var gruntFile = fs.openSync('./Gruntfile.js', 'r');
    expect(gruntFile).to.exist;
  });


  describe('transforms', function() {
    describe('greyErase', function() {
      beforeEach(function(done){
        // console.log("File: ", __filename);
        transformer('./test/support/fixtures/bitmap1.bmp', ('./test/support/temp/testGreyErase.bmp'), transforms.greyErase );
        done();
      });

      it('turns the entire color palette table to one shade of gray', function(done){
        var origBmp = fs.readFileSync('./test/support/fixtures/bitmap1.bmp');
        var greyBmp = fs.readFileSync('./test/support/temp/testGreyErase.bmp');
        // expect(origBmp.readUInt8(58)).to.not.equal(greyBmp.readUInt8(58));
        for(var i=55, colorVal; i < origBmp.readUInt32LE(10); i++) {
          colorVal = greyBmp.readUInt8(i);
          expect(colorVal).to.eq(150);
        }
        done();
      });
    });

    describe('invert', function() {
      beforeEach(function(done){
        transformer('./test/support/fixtures/bitmap1.bmp', ('./test/support/temp/testInvert.bmp'), transforms.invert );
        done();
      });

      it('it inverts the colors, subtracting each from 255', function(done){
        var origBmp = fs.readFileSync('./test/support/fixtures/bitmap1.bmp');
        var invtBmp = fs.readFileSync('./test/support/temp/testInvert.bmp');
        expect(origBmp.readUInt8(58)).to.not.equal(invtBmp.readUInt8(58));
        for(var i=55, origColor, invtColor; i < origBmp.readUInt32LE(10); i++) {
          origColor = origBmp.readUInt8(i);
          invtColor = invtBmp.readUInt8(i);
          expect(invtColor).to.eq( (255 - origColor) );
        }
        done();
      });
    });
  });
});






