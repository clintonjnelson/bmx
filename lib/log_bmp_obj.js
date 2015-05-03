'use strict';

module.exports = function(bmpObj){
  if (bmpObj.fileHeader.bmType.toString('ascii') === "BM") {

    // Print info on the File Header
    var fileHeaderKeys = Object.keys(bmpObj.fileHeader);
    console.log();
    console.log( '########### BMP File Info ###########' );
    console.log( "BMP Type is: " + bmpObj.fileHeader.bmType.toString('ascii') + " (should say BM)" );
    for(var i=0; i < fileHeaderKeys.length; i++) {
      console.log( fileHeaderKeys[i], ": ", bmpObj.fileHeader[fileHeaderKeys[i]] )
    }

    // Print info on the DIB Header
    var dibHeaderKeys = Object.keys(bmpObj.dibHeader);
    console.log();
    console.log( '########### Dib Header Info ###########' );
    for(var i=0; i < dibHeaderKeys.length; i++) {
      console.log( dibHeaderKeys[i], ": ", bmpObj.dibHeader[dibHeaderKeys[i]] )
    }

    // Print info on the Color Table
    var colorTableKeys = Object.keys(bmpObj.colorTable);
    console.log();
    console.log( '########### Color Table ###########' );
    for(var i=0; i < colorTableKeys.length; i++) {
      console.log( colorTableKeys[i], ": ", bmpObj.colorTable[colorTableKeys[i]] )
    }

    // Print info on the Image Pixel Array
    var imageKeys = Object.keys(bmpObj.image);
    console.log();
    console.log( '########### Image Info ###########' );
    for(var i=0; i < imageKeys.length; i++) {
      console.log( imageKeys[i], ": ", bmpObj.image[imageKeys[i]] )
    }

  } else throw "Error: Incorrect File Type. BM type ONLY."
};
