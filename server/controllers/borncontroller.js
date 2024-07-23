const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const newbornModel = require('../models/bornModel');

exports.insertBorn = async (req, res) => {


    res.json('born')
}

exports.updateBornsVideo = async (req, res) => {
    var tmp = changeVideoDataToQueryType(req.body);
    var result = await newbornModel.UpdateBornsVideo(tmp);
    res.json(result);
}

exports.createBornsPDF = async (req, res) => {
    var tmp = changePdfDataToQueryType(req.body);

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

    doc.fontSize(20).text(`こども氏名: ${req.body.name}`);
    doc.moveDown();
    doc.fontSize(18).text(`生年月日: ${req.body.birth}`);
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(16).text(`簡単な説明:`);
    doc.moveDown();
    doc.fontSize(15).text(req.body.description);
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(16).text(`詳細説明:`);
    doc.moveDown();
    doc.fontSize(15).text(req.body.file_note);

    // Finalize the document
    doc.end();


    req.body.url = relativePath;

    var tmp = changePdfDataToQueryType(req.body);
    var result = await newbornModel.UpdateBornsPDF(tmp);

    writeStream.on('finish', () => {
        res.json(result);
    });
}

exports.updateBornsPdf = async (req, res) => {
    var tmp = changePdfDataToQueryType(req.body);
    var result = await newbornModel.UpdateBornsPDF(tmp);

    res.json(result);
}

function changePdfDataToQueryType(data) {
    var idxValue = 'pdf_child' + data.childIdx + '_';
    var obj = {
        id: data.idx,
    };

    var aArray = [];

    var query = 'update user_borns_pdf set ';

    for (const key in data) {
        // Skip keys that are not relevant for the update
        if (key === 'childIdx' || key === 'idx' || key === 'file' || key === 'update_date' || key === 'file_note') continue;

        obj[idxValue + key] = data[key]; // Updated to data[key] to match the context
        query += idxValue + key + '=?, ';

        aArray.push(data[key]);
    }

    query += idxValue + 'update_date = NOW() where id=?';
    aArray.push(obj.id);
    obj.query = query;
    obj.value = aArray

    return obj;
}

function changeVideoDataToQueryType(data) {
    var idxValue = 'video_child' + data.childIdx + '_';
    var obj = {
        id: data.idx,
    };

    var aArray = [];

    var query = 'update user_borns_video set ';

    for (const key in data) {
        // Skip keys that are not relevant for the update
        if (key === 'childIdx' || key === 'idx' || key === 'user_id') continue;

        obj[idxValue + key] = data[key]; // Updated to data[key] to match the context
        query += idxValue + key + '=?, ';

        aArray.push(data[key]);
    }

    query += idxValue + 'update_date = NOW() where id=?';
    aArray.push(obj.id);
    obj.query = query;
    obj.value = aArray

    return obj;
}