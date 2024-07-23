const userModel = require('../models/userModel');
const userWillModel = require('../models/deathModel');
const userBornModel = require('../models/bornModel');
const userMakeWillModel = require('../models//makeWill');
const payHandleModel = require('../models/payModel');

exports.getUserLogin = async (req, res) => {
    const userInfo = await userModel.getUserInfoByEmailAndPwd(req);
    if (userInfo.length > 0) {
        res.json(userInfo[0]);
    } else {
        res.json('incorrect login info');
    }
}

exports.updateUserInfo = async (req, res) => {
    const result = await userModel.UpdateUserInfo(req);
    res.json(result);
}

exports.confirmRequestUser = async (req, res) => {
    try {
        const result = await userModel.ConfirmRequestUser(req);
        
        if (result.length != 0) {
            res.json({message: 200, data: result[0]});
        } else {
            res.json({message: 400, data: []});
        }
    } catch (error) {
        res.json({message: 500})        
    }
}

exports.payForReadDoc = async (req, res) => {
    try {
        const result = await payHandleModel.PayForReadDoc(req);

        res.json({ message: 200, data: result.insertId });
    } catch (error) {
        res.json({ message: 500, data: 0 });
    }
}

exports.getRequestUserINfo = async (req, res) => {
    try {
        const result = await payHandleModel.GetRequestUserINfo(req);

        res.json({ message: 200, data: result });
    } catch (error) {
        res.json({ message: 500, data: 0 });
    }
}

exports.getPaidUserList = async (req, res) => {
    try {
        const result = await userModel.GetMultiUsers(req);

        res.json({ message: 200, data: result });
    } catch (error) {
        res.json({ message: 500, data: 0 });
    }
}

exports.checkPayStatu = async (req, res) => {
    try {
        const result = await payHandleModel.CheckPayStatu(req);
        res.json({ message: 200, data: result });
    } catch (error) {
        res.json({ message: 500, data: 0 });
    }
}

exports.userRegister = async (req, res) => {
    var userInfo = await userModel.getUserInfoByEmail(req);
    if (userInfo.length > 0) {
        res.json('email already exists');
    } else {
        var result = await userModel.addUserInfo(req);

        res.json(result.insertId)
    }
}

exports.forgotPwd = async (req, res) => {
    var forgotInfo = await userModel.getUserInfoByEmail(req);

    if (forgotInfo.length > 0) {
        res.json('email exist');
    } else {
        res.json('no exist email address');
    }
}

exports.resetPwd = async (req, res) => {
    var resetInfo = await userModel.updateUserPwd(req);
    res.json('success')
}

exports.getMembers = async (req, res) => {
    var resetInfo = await userModel.getMembers();
    res.json(resetInfo)
}

exports.block = async (req, res) => {
    var resetInfo = await userModel.setBlock(req);
    if (resetInfo.serverStatus == 2) res.json('success')
    else res.json('failure')
}

exports.contact = async (req, res) => {
    try {
        await userModel.Contact(req);

        res.json({ message: 200 });
    } catch (error) {
        res.json({ message: 500 });
    }
}

exports.getUserData = async (req, res) => {
    var userWillVideos = await userWillModel.GetDeathVideos(req);
    var userWillPdfs = await userWillModel.GetDeathPdfs(req);
    var userBornVideos = await userBornModel.GetBornVideos(req);
    var userBornPdfs = await userBornModel.GetBornPdfs(req);
    var userMakeWill = await userMakeWillModel.GetMakeWill(req);

    var userData = {
        id: req.body.id,
        wills: {
            videos: changewillsDataStructureToArray(userWillVideos[0], 'video'),
            pdf: changewillsDataStructureToArray(userWillPdfs[0], 'pdf'),
        },

        borns: {
            videos: changeBornsDataStructure(userBornVideos[0], 'video'),
            pdf: changeBornsDataStructure(userBornPdfs[0], 'pdf')
        },

        makeWills: {
            wills: userMakeWill[0]
        }
    }

    res.json(userData);
}

exports.updateWillsVideoData = async (req, res) => {
    var data = changeWillsDataToObj(req.body);
    var result = await userWillModel.UpdateWillsVideoData(data);
    res.json(result);
}

function changeWillsDataToObj(data) {
    var obj = {
        id: data.id,
    };

    var query = 'update user_will_video set ';

    var aArray = [];

    var idxValue = '';

    var idx_relation = data.idx_relation;

    for (const key in data) {
        if (key === 'update_date' || key === 'idx_relation' || key === 'id' || key === 'lawyer_relation') continue;

        if (idx_relation === 0) {
            idxValue = 'video_family_';
            obj[`video_family_${key}`] = data[key];
        }

        if (idx_relation === 1) {
            idxValue = 'video_relation_';
            obj[`video_relation_${key}`] = data[key];
        }

        if (idx_relation === 2) {
            idxValue = 'video_other_';
            obj[`video_other_${key}`] = data[key];
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

function changewillsDataStructureToArray(data, type) {
    const resultArray = [];
    const resultFamily = {};
    const resultRelation = {};
    const resultOther = {};
    const obj = {
        id: data.id,
        user_id: data.user_id,
        data: resultArray
    }

    for (const key in data) {
        if (key.includes(type + '_family')) {
            const newKey = key.replace(type + '_family_', '');
            resultFamily[newKey] = data[key];
        }

        if (key.includes(type + '_relation')) {
            const newKey = key.replace(type + '_relation_', '');
            resultRelation[newKey] = data[key];

        }

        if (key.includes(type + '_other')) {
            const newKey = key.replace(type + '_other_', '');
            resultOther[newKey] = data[key];

        }
    };

    resultArray.push(resultFamily);
    resultArray.push(resultRelation);
    resultArray.push(resultOther);

    obj.data = resultArray;

    return obj;
}

function changeBornsDataStructure(data, type) {
    const resultArray = [];
    const child = {};
    const child1 = {};
    const child2 = {};
    const child3 = {};
    const child4 = {};
    const obj = {
        id: data.id,
        user_id: data.user_id,
        data: resultArray
    }

    for (const key in data) {
        if (key.includes(type + '_child0')) {
            const newKey = key.replace(type + '_child0_', '');
            child[newKey] = data[key];
        }

        if (key.includes(type + '_child1')) {
            const newKey = key.replace(type + '_child1_', '');
            child1[newKey] = data[key];
        }

        if (key.includes(type + '_child2')) {
            const newKey = key.replace(type + '_child2_', '');
            child2[newKey] = data[key];
        }

        if (key.includes(type + '_child3')) {
            const newKey = key.replace(type + '_child3_', '');
            child3[newKey] = data[key];
        }

        if (key.includes(type + '_child4')) {
            const newKey = key.replace(type + '_child4_', '');
            child4[newKey] = data[key];
        }
    };

    resultArray.push(child);
    resultArray.push(child1);
    resultArray.push(child2);
    resultArray.push(child3);
    resultArray.push(child4);

    obj.data = resultArray

    return obj;
}