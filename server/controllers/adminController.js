const adminModel = require('../models/adminModel');

exports.getLoginInfo = async (req, res) => {
    try {
        const result = await adminModel.GetLoginInfo(req);

        if (result.length === 0) {
            res.json({ message: 400 });
        } else {
            res.json({ message: 200, data: result });
        }
    } catch (error) {
        res.json({ message: 500 });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const result = await adminModel.GetAllUser(req);
        // const rResult = getBornsData(result);

        res.json({ message: 200, data: result });
    } catch (error) {
        res.json({ message: 500 });
    }
}

exports.getAllInfo = async (req, res) => {
    try {
        const result = await adminModel.GetAllInfo();

        res.json({ message: 200, data: result });
    } catch (error) {
        res.json({ message: 500 });
    }
}


exports.updateInfo = async (req, res) => {
    try {
        const result = await adminModel.UpdateInfo(req);

        res.json({ message: 200, data: result });
    } catch (error) {
        res.json({ message: 500 });
    }
}

exports.addNewInfo = async (req, res) => {
    try {
        const result = await adminModel.AddNewInfo(req);

        res.json({ message: 200, data: result });
    } catch (error) {
        res.json({ message: 500 });
    }
}

exports.getAdminInfo = async (req, res) => {
    const adminManageInfo = {
        adminInfo: [],
        updateHistory: [],
        contactUser: [],
    }
    try {
        const result = await adminModel.GetAdminInfo(req);
        adminManageInfo.adminInfo = result;

        const historyResult = await adminModel.GetUpdateHistory();
        adminManageInfo.updateHistory = historyResult;

        
        const contactResult = await adminModel.GetAllContactHistory();
        adminManageInfo.contactUser = contactResult;

        res.json({ message: 200, result: adminManageInfo });
    } catch (error) {
        res.json({ message: 500 });
    }
}

exports.updateAdminInfo = async (req, res) => {
    try {
        const result = await adminModel.UpdateAdminInfo(req);
        res.json({ message: 200, data: result });
    } catch (error) {
        res.json({ message: 500 });
    }
}