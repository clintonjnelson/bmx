'use strict';

var transformer = require('../bmx.js').transformer;
var transforms = require('../bmx.js').transforms;

var transformsKeys = Object.keys(transforms);
var testNum;

// Format: transformer(my/path/originalFile.bmp, my/path/newFile.bmp, transform);


// Loop all transforms for palette version
// for (var i in transformsKeys ) {    // for index values in transformsKeys
//   testNum = i + 1;
//   transformer('./lib/bitmap1.bmp', ('test' + testNum + '.bmp'), transforms[ transformsKeys[i] ]);
// }


// Run Examples For Non-Color-Table/Palette BMP's
// transformer('./lib/non_palette_bitmap.bmp', './lib/example_images/exInvtNon.bmp', transforms.invert );
// transformer('./lib/non_palette_bitmap.bmp', './lib/example_images/exOnlyBluesNon.bmp', transforms.onlyBlues );
// transformer('./lib/non_palette_bitmap.bmp', './lib/example_images/exRandomNon.bmp', transforms.random );

// Run Examples for Color-Table-Palette BMP's
// transformer('./lib/bitmap1.bmp', './lib/example_images/exInvt.bmp', transforms.invert );
// transformer('./lib/bitmap1.bmp', './lib/example_images/exGreyScale.bmp', transforms.greyScale );
// transformer('./lib/bitmap1.bmp', './lib/example_images/exOnlyBlues.bmp', transforms.onlyBlues );
// transformer('./lib/bitmap1.bmp', './lib/example_images/exOnlyGreens.bmp', transforms.onlyGreens );
// transformer('./lib/bitmap1.bmp', './lib/example_images/exColorSwap.bmp', transforms.colorSwap );
// transformer('./lib/bitmap1.bmp', './lib/example_images/exRandom.bmp', transforms.random );



