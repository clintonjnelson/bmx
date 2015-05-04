// Library for BMP Transforms With Node
// Handles ColorTable/Palette & Non-ColorTable/Palette BMP's
// BM Format only.

'use strict';

var fs = require('fs');
var logBmpObj = require('./lib/log_bmp_obj.js');
var _shuffle = require('lodash').shuffle;


module.exports = {
  transformer: function(bmpFilePath, outputFileName, transformCB, callback) {
    fs.readFile(bmpFilePath, function(err, data) {
      if(err) throw err;
      var bmpRaw = data;

      // Parts of the BMP broken out into an object
      var bmpObj = {
        fileHeader: {
          full: bmpRaw.slice(0, 14),
          bmType: bmpRaw.slice(0,2),    // reading changes format, use slice
          byteSize: bmpRaw.readUInt32LE(2),
          offsetToImg: bmpRaw.readUInt32LE(10)
        },
        dibHeader: {  // Pull out the Color Palette Info (right after header in the bmp)
          full: bmpRaw.slice(14, 50),
          size: bmpRaw.readUInt32LE(14),
          imgWidth: bmpRaw.readUInt32LE(18),
          imgHeight: bmpRaw.readUInt32LE(22),
          bitsPerPixel: bmpRaw.readUInt16LE(28),
          compMethod: bmpRaw.readUInt32LE(30),
          imgSize: bmpRaw.readUInt32LE(34),
          numPaletteColors: bmpRaw.readUInt32LE(46),
        },
        colorTable: {
          full: bmpRaw.slice(54, bmpRaw.readUInt32LE(10))
        },
        image: {
          full: bmpRaw.slice(bmpRaw.readUInt32LE(10), bmpRaw.length)
        }
      };
      logBmpObj(bmpObj);                     // Console.log parsed info

      // Setup for Reading/Writing Color Data
      var numColors = bmpObj.dibHeader.numPaletteColors; // 256
      var cpOffset = 54;                        // Offset to Color Palette Table (if has one)
      var endOffset = bmpRaw.readUInt32LE(10);  // 1078 for color-Palette file, 54 for Nonpalette file
      function bmpTransform(endTrans) {
        function rgbaWrite(b, g, r, a) {          // Write New Buffer Bytes
          bmpRaw.writeUInt8( b, i     );
          bmpRaw.writeUInt8( g, i + 1 );
          bmpRaw.writeUInt8( r, i + 2 );
          bmpRaw.writeUInt8( a, i + 3 );
        }

        // Loop through reading, transforming, writing back to buffer
        for(var b, g, r, a, i = cpOffset; i < endTrans; i += 4 ) {
          b = bmpRaw.readUInt8( i     );
          g = bmpRaw.readUInt8( i + 1 );
          r = bmpRaw.readUInt8( i + 2 );
          a = bmpRaw.readUInt8( i + 3 );

          // Transform per passed transform function
          transformCB(b, g, r, a, rgbaWrite);
        }

        // Write the Transformed File
        writeNewBmpFile();
      }

      function writeNewBmpFile() {              // Write Buffer to new File
        fs.writeFile(outputFileName, bmpRaw, function(err) {
          if(err) throw err;

          // Insert Callback Here for Async Testing Functionality (passing done() )
          if(typeof callback === 'function'){
            callback();
          }
          console.log("it Saved!");
        });

      }

      // Run Transforms
      if(cpOffset < endOffset) {
        bmpTransform(endOffset);
      } else if( (cpOffset === endOffset) && (bmpObj.dibHeader.bitsPerPixel === 24) ) {
        bmpTransform(bmpRaw.length);
      } else {
        console.log("Sorry, bmx is currently not configured to transform that kind of bitmap.");
      }
    });
  },

  transforms: {
    // Literally make image a solid greyscale block
    greyErase: function (b, g, r, a, bgraWriteCallback) {
      b = g = r = a = 150;
      bgraWriteCallback(b, g, r, a);
    },
    // Invert Colors - per
    invert: function(b, g, r, a, bgraWriteCallback){
      var bInv = 255 - b;
      var gInv = 255 - g;
      var rInv = 255 - r;
      var aInv = 255 - a;
      bgraWriteCallback(bInv, gInv, rInv, a);
    },
    // Makes image darker
    darker: function(b, g, r, a, bgraWriteCallback){
      var bGray = Math.min( Math.floor(0.5 * b ), 255 );
      var gGray = Math.min( Math.floor(0.5 * g ), 255 );
      var rGray = Math.min( Math.floor(0.5 * r ), 255 );
      bgraWriteCallback(bGray, gGray, rGray, a);
    },
    // Swap color values around randomly - 3 options possible
    colorSwap: function(b, g, r, a, bgraWriteCallback){
      var arr = [b, g, r];
      arr = _shuffle(arr);
      bgraWriteCallback(arr.pop(), arr.pop(), arr.pop(), a);
    },
    // Remove every color but reds
    onlyReds: function(b, g, r, a, bgraWriteCallback){
      bgraWriteCallback(0, 0, r, a);
    },
    // Remove every color but greens
    onlyGreens: function(b, g, r, a, bgraWriteCallback){
      bgraWriteCallback(0, g, 0, a);
    },
    // Remove every color but blues
    onlyBlues: function(b, g, r, a, bgraWriteCallback){
      bgraWriteCallback(b, 0, 0, a);
    },
    // Choose new random colors for the Image
    random: function(b, g, r, a, bgraWriteCallback){
      var bRand = Math.floor(Math.random() * 255);
      var gRand = Math.floor(Math.random() * 255);
      var rRand = Math.floor(Math.random() * 255);
      bgraWriteCallback(bRand, gRand, rRand, a);
    }
  }
};
