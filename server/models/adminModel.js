const getConnection = require('../util/dbconnection');

const adminModel = {
    GetLoginInfo: async (req) => {
        const connection = await getConnection();

        const [rows] = await connection.query('SELECT * FROM admin WHERE email=? AND password=?', [req.body.email, req.body.password]);

        return rows;
    },

    GetAllUser: async (req) => {
        try {
            const connection = await getConnection();
            const [results] = await connection.query(
                `SELECT 
                    u.*,
                    ubp.*,
                    ubv.*,
                    uwp.*,
                    uwv.*,
                    umw.*
                FROM 
                    user u
                LEFT JOIN 
                    user_borns_pdf ubp ON u.id = ubp.user_id
                LEFT JOIN 
                    user_borns_video ubv ON u.id = ubv.user_id
                LEFT JOIN 
                    user_make_will umw ON u.id = umw.user_id
                LEFT JOIN 
                    user_will_pdf uwp ON u.id = uwp.user_id
                LEFT JOIN 
                    user_will_video uwv ON u.id = uwv.user_id
                `
            );

            return results;
        } catch (error) {
            console.error('Error fetching user data by ID:', error);

            return error;
        }
    },

    GetAllInfo: async (req) => {
        const connection = await getConnection();

        const [rows] = await connection.query('SELECT * FROM info WHERE kind=?', ['admin']);

        return rows;
    },

    UpdateInfo: async (req) => {
        const query = `
        UPDATE info 
        SET 
            date = NOW(), 
            title = ?, 
            subTitle = ?,
            content = ?,
            kind = ?,
            senderInfo = ?
        WHERE id = ?`;

        const connection = await getConnection();

        const [rows] = await connection.query(query, [
            req.body.title,
            req.body.subTitle,
            req.body.content,
            req.body.kind,
            req.body.senderInfo,
            req.body.id
        ]);

        return rows;
    },

    AddNewInfo: async (req) => {
        const connection = await getConnection();

        const [rows] = await connection.query('insert into info(date, title, subTitle, content, kind, senderInfo) values(?, ?, ?, ?, ?, ?)', [new Date(), req.body.title, req.body.subTitle, req.body.content, 'admin', 'admin@admiin.com']);

        return rows;
    },

    GetAdminInfo: async (req) => {
        const connection = await getConnection();

        const [rows] = await connection.query('SELECT * FROM admin');

        return rows;
    },

    GetUpdateHistory: async () => {
        const connection = await getConnection();

        const [rows] = await connection.query('SELECT * FROM update_data');

        return rows;
    },

    UpdateAdminInfo: async (req) => {
        const query = `
        UPDATE admin 
        SET 
            email = ?, 
            password = ?
        WHERE id = ?`;
        const connection = await getConnection();

        const [rows] = await connection.query(query, [
            req.body.email,
            req.body.password,
            req.body.id
        ]);

        return rows;
    },

    GetAllContactHistory: async () => {
        const connection = await getConnection();

        const [rows] = await connection.query("SELECT * FROM info WHERE kind!='admin'");

        return rows;
    },
};

module.exports = adminModel;