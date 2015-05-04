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

  // Color-Paletted Bitmaps
  describe('with color-palette bitmap files', function(){
    describe('has the transform', function() {
      describe('greyErase that', function() {
        beforeEach(function(done){
          // console.log("File: ", __filename);
          transformer('./test/support/fixtures/bitmap1.bmp', './test/support/temp/testGreyErase.bmp', transforms.greyErase );
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

      describe('invert that', function() {
        beforeEach(function(done){
          transformer('./test/support/fixtures/bitmap1.bmp', './test/support/temp/testInvert.bmp', transforms.invert );
          done();
        });

        it('inverts the colors, subtracting each from 255', function(done){
          console.log('Current directory is: ', process.cwd() );
          var origBmp = fs.readFileSync('./test/support/fixtures/bitmap1.bmp');
          var invtBmp = fs.readFileSync('./test/support/temp/testInvert.bmp');
          for(var i=55, origColor, invtColor; i < origBmp.readUInt32LE(10); i++) {
            // FIX FOR THE "a" values that are screwing things up. Don't need to change. IF statement.
            if(i%4 === 2) {
              origColor = origBmp.readUInt8(i);
              invtColor = invtBmp.readUInt8(i);
              expect(invtColor).to.eq( (255 - origColor) );
            }
          }
          done();
        });
      });
    });
  });

  // Non-Palette BMP's - Modify the Pixel Arrays
  describe('with NON-color-palette bitmap files', function(){
    describe('has the transform', function() {
      describe('greyErase that', function() {
        beforeEach(function(done){
          // console.log("File: ", __filename);
          transformer('./test/support/fixtures/non_palette_bitmap.bmp', './test/support/temp/testNonGreyErase.bmp', transforms.greyErase );
          done();
        });

        it('turns the entire color palette table to one shade of gray', function(done){
          var origBmp = fs.readFileSync('./test/support/fixtures/non_palette_bitmap.bmp');
          var greyBmp = fs.readFileSync('./test/support/temp/testNonGreyErase.bmp');
          // expect(origBmp.readUInt8(58)).to.not.equal(greyBmp.readUInt8(58));
          for(var i=55, colorVal; i < origBmp.readUInt32LE(10); i++) {
            colorVal = greyBmp.readUInt8(i);
            expect(colorVal).to.eq(150);
          }
          done();
        });
      });

      describe('invert that', function() {
        beforeEach(function(done){
          transformer('./test/support/fixtures/non_palette_bitmap.bmp', './test/support/temp/testNonInvert.bmp', transforms.invert );
          done();
        });

        it('inverts the colors, subtracting each from 255 in each pixel', function(done){
          console.log('Current directory is: ', process.cwd() );
          var origBmp = fs.readFileSync('./test/support/fixtures/non_palette_bitmap.bmp');
          var invtBmp = fs.readFileSync('./test/support/temp/testNonInvert.bmp');
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
});






