const deathModel = require('../models/deathModel');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

exports.getDeathVideos = async (req, res) => {
    var userInfo = await deathModel.GetDeathVideos(req);
    if (userInfo.info == "success") {
        return res.json('success');
    } else {
        return res.json('no exist email address');
    }
}

exports.removeFile = async (req, res) => {
    const filePath = path.join(__dirname, '../../public', req.body.fileInfo);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send({ message: 'File deletion failed', error: err.message });
        }
        res.send({ message: 'File deleted successfully' });
    });
}

exports.createFile = async (req, res) => {
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

    doc.fontSize(20).text(`受取人氏名: ${req.body.lawyer_name}`);
    doc.moveDown();
    doc.fontSize(18).text(`受取人生年月日: ${req.body.lawyer_birth}`);
    doc.moveDown();
    doc.fontSize(18).text(`受取人との関係: ${req.body.lawyer_relation}`);
    doc.moveDown();
    doc.moveDown(); // Add some space before the description
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

    var pdfsObj = changeWillsDataToObj(req.body);

    var result = await deathModel.UpdataWillsPdf(pdfsObj);

    result.filepath = relativePath

    writeStream.on('finish', () => {
        res.json(result);
    });

}

exports.updataDeathPdfs = async (req, res) => {
    var data = changeWillsDataToObj(req.body);

    var result = await deathModel.UpdataWillsPdf(data);

    res.json(result);
}

function changeWillsDataToObj(data) {
    var obj = {
        id: data.id,
    };

    var query = 'update user_will_pdf set ';

    var aArray = [];

    var idxValue = '';

    var idx_relation = data.idx_relation;

    for (const key in data) {
        if (key === 'update_date' || key === 'idx_relation' || key === 'file' || key === 'id' || key === 'file_note') continue;

        if (idx_relation === 0) {
            idxValue = 'pdf_family_';
            obj[`pdf_family_${key}`] = data[key];
        }

        if (idx_relation === 1) {
            idxValue = 'pdf_relation_';
            obj[`pdf_relation_${key}`] = data[key];
        }

        if (idx_relation === 2) {
            idxValue = 'pdf_other_';
            obj[`pdf_other_${key}`] = data[key];
        }

        query += idxValue + key + '=?, ';

        aArray.push(data[key]);
    }

    query += idxValue + 'update_date = NOW() where id=?';
    aArray.push(obj.id);
    obj.query = query;
    obj.value = aArray

    return obj;
}