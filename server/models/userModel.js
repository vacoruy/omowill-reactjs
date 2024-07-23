const getConnection = require('../util/dbconnection');

const userModel = {
    getUserInfoByEmail: async (req) => {
        const connection = await getConnection();

        const [rows, fields] = await connection.query('SELECT * FROM user WHERE email=?', [req.body.email]);

        return rows;
    },

    ConfirmRequestUser: async (req) => {
        const connection = await getConnection();

        const [rows] = await connection.query('SELECT * FROM user WHERE email=?', [req.body.email]);

        return rows;
    },

    UpdateUserInfo: async (req) => {
        const query = `
            UPDATE user 
            SET 
                firstname = ?, 
                lastname = ?, 
                birthdate = ?,
                prefectures = ?,
                address1 = ?, 
                address2 = ?,
                postal_code = ?,
                apartment = ?,
                email = ?,
                telephone = ?,
                created_at = NOW()
            WHERE id = ?`;

        const connection = await getConnection();

        const [rows] = await connection.query(query, [
            req.body.userInfo.firstname,
            req.body.userInfo.lastname,
            req.body.userInfo.birthdate,
            req.body.userInfo.prefectures,
            req.body.userInfo.address1,
            req.body.userInfo.address2,
            req.body.userInfo.postal_code,
            req.body.userInfo.apartment,
            req.body.userInfo.email,
            req.body.userInfo.telephone,
            req.body.id
        ]);

        return rows;
    },

    getUserInfoByEmailAndPwd: async (req) => {
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM user WHERE email=? AND password=?', [req.body.email, req.body.password]);

        return result;
    },

    getMembers: async (req) => {
        const connection = await getConnection();
        const [rows, fields] = await connection.query('SELECT * FROM user WHERE not admin = 1');

        return rows;
    },

    setBlock: async (req) => {
        const connection = await getConnection();

        const [rows, fields] = await connection.query('update user set state = ? where id = ?', [req.body.value, req.body.index]);

        return rows;
    },
    Contact: async (req) => {
        const connection = await getConnection();
        const [rows] = await connection.query('insert into info(date, title, subTitle, content, kind, senderInfo, status) values(?, ?, ?, ?, ?, ?, ?)', [new Date(), req.body.title, req.body.subTitle, req.body.content, req.body.senderEmail, 'admin@admin.com', 0]);

        return rows;
    },

    addUserInfo: async (req) => {
        const connection = await getConnection();
        const [userResult] = await connection.query(
            'INSERT INTO user (`firstname`, `lastname`, `birthdate`, `prefectures`, `address1`, `address2`, `postal_code`, `apartment`, `email`, `password`, `telephone`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                req.body.firstName,
                req.body.lastName,
                req.body.birthDate,
                req.body.prefectures,
                req.body.address1,
                req.body.address2,
                req.body.postalCode,
                req.body.apartment,
                req.body.email,
                req.body.password,
                req.body.telephone,
                'user',
            ]
        );

        const userID = userResult.insertId;

        await connection.query(
            `INSERT INTO user_borns_pdf (user_id) VALUES (?)`, [userID]
        )

        await connection.query(
            `INSERT INTO user_borns_video (user_id) VALUES (?)`, [userID]
        )

        await connection.query(
            `INSERT INTO user_make_will (user_id) VALUES (?)`, [userID]
        )

        await connection.query(
            `INSERT INTO user_will_pdf (user_id) VALUES (?)`, [userID]
        )

        await connection.query(
            `INSERT INTO user_will_video (user_id) VALUES (?)`, [userID]
        )

        await connection.commit();

        return userResult;
    },

    updateUserPwd: async (req) => {
        const connection = await getConnection();
        const [rows, fields] = await connection.query(
            'UPDATE user SET password=? WHERE email=?',
            [
                req.body.password,
                req.body.email
            ]
        );

        return rows;
    },

    GetMultiUsers: async (req) => {
        const userIds = req.body;

        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ error: 'Invalid input, expected an array of user IDs' });
        }
    
        // Create placeholders for the number of user IDs
        const placeholders = userIds.map((ele) => ele).join(',');

        try {

            const multiQuery = `
                SELECT 
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
                WHERE 
                    u.id IN (${placeholders})
            `;

            const connection = await getConnection();
            const [results] = await connection.query(
                multiQuery
            );

            return results;
        } catch (error) {
            console.error('Error fetching user data by ID:', error);

            return error;
        }
    },

    GetUserData: async (req) => {
        try {
            const connection = await getConnection();
            const [results] = await connection.query(
                `SELECT 
                    u.id AS user_id,
                    
                    ubp.*,
                    ubv.*,
                    uwp.*,
                    uwv.*,
                    umw.id AS make_will_id
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
                WHERE 
                    u.id = ?`,
                [req.body.id]
            );

            return results;
        } catch (error) {
            console.error('Error fetching user data by ID:', error);

            return error;
        }
    }
};

module.exports = userModel;