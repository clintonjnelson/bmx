'use strict';

var transformer = require('./bmx.js').transformer;
var transforms = require('./bmx.js').transforms;

var transformsKeys = Object.keys(transforms);
var testNum;
for (var i in transformsKeys ) {    // for index values in transformsKeys
  testNum = i + 1;
  transformer('./lib/bitmap1.bmp', ('test' + testNum + '.bmp'), transforms[ transformsKeys[i] ]);
}


// transformer('./lib/non_palette_bitmap.bmp', ('test1.bmp'), transforms.greyErase );
// transformer('./lib/bitmap1.bmp', ('test2.bmp'), transforms.invert );
// transformer('./lib/bitmap1.bmp', ('test3.bmp'), transforms.monochrome );
// transformer('./lib/bitmap1.bmp', ('test4.bmp'), transforms.onlyBlues );
// transformer('./lib/bitmap1.bmp', ('test5.bmp'), transforms.onlyGreens );
// transformer('./lib/bitmap1.bmp', ('test6.bmp'), transforms.colorSwap );
// transformer('./lib/bitmap1.bmp', ('test7.bmp'), transforms.random );



