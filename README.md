Bitmap Transformer: Application to alter bitmap images

Use:
1. Requre in bmx.js.
  var bmx = require('./bmx.js');
  var transformer = bmx.transformer;
  var transforms = bmx.transforms;
  - bmx is an object library.
  - bmx has two main properties: transformer & transforms
  - Transformer runs the transforms.
  - Transforms are the various transform functions you can run.
2. Provide an original file patn, new file output path, and a prefered transform
  transformer('my/path/originalFile.bmp', 'my/path/newFile.bmp', transforms.someTransform);
  - someTransform Options:
      invert, random, greyErase



Contributions (Credit):
  Stephanie
    Tipped me of that I was using readInt--LE, instead of readUInt--LE
  Joey
    Recommended the approach of reading values & writing directly to buffer in 8bit chunks to get thing working.
    I succombed to take that approach, and refactor later (if time).
  Tyler
    Inspired random & invert by mentioning them
  @vmx on StackOverflow
    mentioning the console.log( process.cwd() ) in a comment
  Aaron
    JSCS: Mentining "verbose" option, and helping debug **/*.js to ./**/*.js for src file
