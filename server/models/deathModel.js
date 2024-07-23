const getConnection = require('../util/dbconnection');
const changeDataType = require('../util/changeDateType');

const deathModel = {
    GetDeathVideos: async (req) => {
        const userID = req.body.id;

        const connection = await getConnection();
        const [result] = await connection.query('select * from user_will_video where user_id = ?', [userID]);

        result[0].video_family_lawyer_birth = changeDataType(result[0].video_family_lawyer_birth);
        result[0].video_family_update_date = changeDataType(result[0].video_family_update_date);
        result[0].video_other_lawyer_birth = changeDataType(result[0].video_other_lawyer_birth);
        result[0].video_other_update_date = changeDataType(result[0].video_other_update_date);
        result[0].video_relation_lawyer_birth = changeDataType(result[0].video_relation_lawyer_birth);
        result[0].video_relation_update_date = changeDataType(result[0].video_relation_update_date);

        return result;
    },

    GetDeathPdfs: async (req) => {
        const userID = req.body.id;

        const connection = await getConnection();
        const [result] = await connection.query('select * from user_will_pdf where user_id = ?;', [userID]);

        result[0].pdf_family_lawyer_birth = changeDataType(result[0].pdf_family_lawyer_birth);
        result[0].pdf_family_update_date = changeDataType(result[0].pdf_family_update_date);
        result[0].pdf_other_lawyer_birth = changeDataType(result[0].pdf_other_lawyer_birth);
        result[0].pdf_other_update_date = changeDataType(result[0].pdf_other_update_date);
        result[0].pdf_relation_lawyer_birth = changeDataType(result[0].pdf_relation_lawyer_birth);
        result[0].pdf_relation_update_date = changeDataType(result[0].pdf_relation_update_date);

        return result;
    },

    Init: async (req) => {
        const userid = req.body.id;
        const connection = await getConnection();
        const [rows, fields] = await connection.query('select * from death where userId = ?;', [userid]);
        rows.info = "success"
        return rows;
    },

    UpdateWillsVideoData: async (data) => {
        const query = data.query;

        const connection = await getConnection();
        const [result] = await connection.query(query, data.value);

        return result;
    },

    UpdataWillsPdf: async (req) => {
        const connection = await getConnection();

        const [result] = await connection.query(req.query, req.value);
        
        return result
    }
};

module.exports = deathModel;