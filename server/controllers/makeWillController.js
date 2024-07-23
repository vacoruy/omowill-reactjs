const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const makeWillModel = require('../models/makeWill');

exports.getMakeWill = async (req, res) => {
   return res.json('success');
}


exports.updateWills = async (req, res) => {
   var result = await makeWillModel.UpdateWills(req);


   res.json(result)
}

exports.createWills = async (req, res) => {
   const relativePath = path.join('/data', Date.now().toString() + '.pdf');
   const filePath = path.join(__dirname, '../../public', relativePath);

   // Create a new PDF document
   const doc = new PDFDocument({
      pdfVersion: '1.5',
      lang: 'ja-JP',
      tagged: true,
      displayTitle: true
   });

   // Stream the document to a file
   const writeStream = fs.createWriteStream(filePath);
   doc.pipe(writeStream);

   // Add text to the document

   doc.font('./public/assets/fonts/static/NotoSansJP-Bold.ttf');

   doc.fontSize(20).text(`財産目録見本: ${req.body.will_real_estate}`);
   doc.moveDown();
   doc.fontSize(18).text(`遺言書作成日': ${req.body.will_real_estate}`);
   doc.moveDown();
   doc.moveDown();
   doc.fontSize(16).text(`簡単な説明:`);
   doc.moveDown();
   doc.fontSize(15).text(req.body.will_note);

   // doc.moveDown();
   // doc.moveDown();
   // doc.fontSize(16).text(`詳細説明:`);
   // doc.moveDown();
   // doc.fontSize(15).text(req.body.file_note);

   // Finalize the document
   doc.end();


   req.body.will_real_url = relativePath;

   var result = await makeWillModel.UpdateWills(req);

   writeStream.on('finish', () => {
      res.json(result);
   });

   res.json('result')
}