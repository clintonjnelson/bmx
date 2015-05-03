'use strict';

var transformer = require('./bmx.js').transformer;
var transforms = require('./bmx.js').transforms;

var transformsKeys = Object.keys(transforms);
var testNum;
// for (var i in transformsKeys ) {    // for index values in transformsKeys
//   testNum = i + 1;
//   transformer('./lib/bitmap1.bmp', ('test' + testNum + '.bmp'), transforms[ transformsKeys[i] ]);
// }


// Without Color Table Palette
transformer('./lib/non_palette_bitmap.bmp', ('./lib/examples/exInvt.bmp'), transforms.greyErase );

// With Color Table Palette
// transformer('./lib/bitmap1.bmp', ('./lib/examples/exInvt.bmp'), transforms.invert );
// transformer('./lib/bitmap1.bmp', ('./lib/examples/exGreyScale.bmp'), transforms.greyScale );
// transformer('./lib/bitmap1.bmp', ('./lib/examples/exOnlyBlues.bmp'), transforms.onlyBlues );
// transformer('./lib/bitmap1.bmp', ('./lib/examples/exOnlyGreens.bmp'), transforms.onlyGreens );
// transformer('./lib/bitmap1.bmp', ('./lib/examples/exColorSwap.bmp'), transforms.colorSwap );
// transformer('./lib/bitmap1.bmp', ('./lib/examples/exRandom.bmp'), transforms.random );



