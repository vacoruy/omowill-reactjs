const getConnection = require('../util/dbconnection');
const changeDataType = require('../util/changeDateType');

const bornModel = {
    GetBornVideos: async (req) => {
        const userID = req.body.id;
        const connection = await getConnection();
        const [result] = await connection.query('select * from user_borns_video where user_id = ?;', [userID]);

        result[0].video_child0_birth = changeDataType(result[0].video_child0_birth);
        result[0].video_child0_update_date = changeDataType(result[0].video_child0_update_date);

        result[0].video_child1_birth = changeDataType(result[0].video_child1_birth);
        result[0].video_child1_update_date = changeDataType(result[0].video_child1_update_date);

        result[0].video_child2_birth = changeDataType(result[0].video_child2_birth);
        result[0].video_child2_update_date = changeDataType(result[0].video_child2_update_date);

        result[0].video_child3_birth = changeDataType(result[0].video_child3_birth);
        result[0].video_child3_update_date = changeDataType(result[0].video_child3_update_date);

        result[0].video_child4_birth = changeDataType(result[0].video_child4_birth);
        result[0].video_child4_update_date = changeDataType(result[0].video_child4_update_date);

        return result;
    },

    GetBornPdfs: async (req) => {
        const userID = req.body.id;
        const connection = await getConnection();
        const [result] = await connection.query('select * from user_borns_pdf where user_id = ?;', [userID]);

        result[0].pdf_child0_birth = changeDataType(result[0].pdf_child0_birth);

        result[0].pdf_child0_update_date = changeDataType(result[0].pdf_child0_update_date);

        result[0].pdf_child1_birth = changeDataType(result[0].pdf_child1_birth);
        result[0].pdf_child1_update_date = changeDataType(result[0].pdf_child1_update_date);

        result[0].pdf_child2_birth = changeDataType(result[0].pdf_child2_birth);
        result[0].pdf_child2_update_date = changeDataType(result[0].pdf_child2_update_date);

        result[0].pdf_child3_birth = changeDataType(result[0].pdf_child3_birth);
        result[0].pdf_child3_update_date = changeDataType(result[0].pdf_child3_update_date);

        result[0].pdf_child4_birth = changeDataType(result[0].pdf_child4_birth);
        result[0].pdf_child4_update_date = changeDataType(result[0].pdf_child4_update_date);

        return result;
    },

    UpdateBornsVideo: async (req) => {
        const connection = await getConnection();
        
        const [result] = await connection.query(req.query, req.value);
        
        return result
    },

    UpdateBornsPDF: async (req) => {
        const connection = await getConnection();
        
        const [result] = await connection.query(req.query, req.value);
        
        return result
    },
};

module.exports = bornModel;