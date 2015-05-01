/// Open a BMP & read it into a buffer
////// Create a readstream
////// Make a new buffer
////// Read the image & write into the buffer
////// Readstream into the new buffer
//////

'use strict';

var fs = require('fs');
// var Buffer = require('buffer').Buffer;
// var stream = require('stream');


// IF we use buffer.slide, it's JUST A REFERE
var fileContents = fs.readFile('bitmap1.bmp', function(err, data){
  if (err) throw err;
  var bmpRaw = data;

  // Pull out the header info
  var bmpObj = {
    header: bmpRaw.slice(0, 14),
    bm_type: bmpRaw.slice(0,2),             // Type of BMP - should be "BM" in ascii
    byteSize: bmpRaw.slice(2, 4),           // Total bmp size
    bmpImg: bmpRaw.slice(14, bmpRaw.length), // Image Portion
    utf8Img: bmpRaw.slice(14, bmpRaw.length).toString('utf-8')  // String version
  }

  console.log("Check bmp type. Type is: " + bmpObj.bm_type.toString('ascii') + " (should say BM).");
  if (bmpObj.bm_type.toString('ascii') === "BM") {
    console.log("BMP Header is: ", bmpObj.header, "with a length of: ", bmpRaw.length + " bytes.");
    // for(var i=0; i < bmpObj.bmpImg.length; i++){
    //   console.log(bmpObj.bmpImg[i]);
    // }
    fs.writeFile('binary_img_data_utf8.txt', bmpObj.utf8Img);
  }
});


  // Next, let's break the header into its pieces

// var buffHeader = new Buffer(14);  // new buffer of __ bytes length
// buffHeader.write(fileContents, 0, 'binary');
// console.log(buff)








// var rs = fs.createReadStream("bitmap1.bmp");


// rs.pipe(buffHeader);
// console.log(buffHeader);



