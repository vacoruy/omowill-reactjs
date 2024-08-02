const getConnection = require('../util/dbconnection');

const PayForReadDocModal = { 
    PayForReadDoc: async (req) => {
        const connection = await getConnection();
        const [rows] = await connection.query('insert into pay_data(create_at, first_name, last_name, birth, address, email, relation_file, death_file, user_id, pay_state) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [new Date(), req.body.first_name, req.body.last_name, req.body.birth, req.body.address, req.body.email, req.body.death_relation_filename[0],  req.body.death_relation_filename[1], req.body.user_id, req.body.pay_state]);

        return rows;
    },

    CheckPayStatu: async (req) => {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT user_id FROM pay_data WHERE email=?', [req.body.email]);

        return result;
    },

    GetRequestUserINfo: async (req) => {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM pay_data');

        return result;
    }
}

module.exports = PayForReadDocModal;