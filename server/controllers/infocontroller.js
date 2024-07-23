const infoModel = require('../models/infoModel');

exports.getInfo = async(req, res) => {
    var info = await infoModel.getInfo(req);

    if(info.length > 0) {
        res.json(info);
    } else {
        res.json('no data');
    }
}

exports.updateContactStatus = async(req, res) => {
    try {
        await infoModel.UpdateContactStatus(req);

        res.json({message: 200})
    } catch (error) {
        res.json({message: 500})
    }

    
}