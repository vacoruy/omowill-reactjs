const getConnection = require('../util/dbconnection');

const infoModel = {
    getInfo: async (req) => {
        const connection = await getConnection();

        const [rows, fields] = await connection.query('SELECT * FROM info WHERE kind = "admin" ORDER BY date DESC');

        return rows;
    },

    UpdateContactStatus: async (req) => {
        const query = `
        UPDATE info 
        SET 
            status = ?
        WHERE id = ?`;
        const connection = await getConnection();

        const [rows] = await connection.query(query, [
            req.body.status,
            req.body.id
        ]);

        return rows;
    }
};

module.exports = infoModel;