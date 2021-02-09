
const tesseract = require("node-tesseract-ocr")
const marvinj = require("marvinj")
var Jimp = require('jimp');
const { text } = require("body-parser");

var textract = require('textract');
  // Jimp.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
  //   console.log(buffer);
  // });


const readCapatcha = async (file)=>{
  textract.fromFileWithPath(file,function (error, text) {
    console.log(error)
    console.log(text)//extracted text
  });
// for (let index = 20; index < 50; index++) {
  
// console.log(`quality_${index}`);

//    Jimp.read(file, (err, lenna) => {
//     if (err) throw err;
//     lenna
//       .normalize() // resize
//       .dither565()
//       .quality(index) // set JPEG quality
//       //.opaque()
//       .greyscale() // set greyscale
//       // .invert()
//      // .background(0xFFFFFFFF)
     
//       .write('lena.jpg'); // save
//   }).catch(err => {
//     console.error(err);
//   });



//    await tesseract.recognize(
//         'lena.jpg',
//         'eng',
      

//       ).then(txt=> {
//         console.log(txt);
//       //  return text;
//       }).catch(err=>{
//           console.log(err)
//          // return false;
//       })
//     }
    console.log("finish")
}

module.exports = readCapatcha;