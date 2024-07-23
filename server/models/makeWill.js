const getConnection = require('../util/dbconnection');

const userMakeWillModel = {
    GetMakeWill: async (req) => {
        const userID = req.body.id;
        const connection = await getConnection();
        const [result] = await connection.query('select * from user_make_will where user_id = ?;', [userID]);

        return result;
    },

    UpdateWills: async (req) => {
        const query = `
            UPDATE user_make_will 
            SET 
                will_real_estate = ?, 
                will_real_url = ?, 
                will_status = ?,
                will_update_date = NOW() 
            WHERE id = ?`;

        const connection = await getConnection();
        const [result] = await connection.query(query, [
            req.body.will_real_estate,
            req.body.will_real_url,
            req.body.will_status,
            req.body.id]);

        return result
    },
}

module.exports = userMakeWillModel;