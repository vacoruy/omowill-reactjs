const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.REACT_APP_DATABASE_HOST_URL,
    user: process.env.REACT_APP_DATABASE_USERNAME,
    password: process.env.REACT_APP_DATABASE_PASSWORD,
    database: process.env.REACT_APP_DATABASE_NAME,
    waitForConnections: process.env.REACT_APP_DATABASE_WAITFORCONNECTION,
    connectionLimit: process.env.REACT_APP_DATABASE_CONNECTIONLIMIT,
    queueLimit: process.env.REACT_APP_DATABASE_QUEUELIMIT,
});

const createTables = async () => {
    try {
        const connection = await pool.promise().getConnection();

        // SQL queries to check and create tables
        const userTableQuery = `
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(100) NOT NULL,
                birthdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                prefectures VARCHAR(100) NOT NULL,
                address1 VARCHAR(200) NOT NULL,
                address2 VARCHAR(200) NOT NULL,
                postal_code VARCHAR(100) NOT NULL,
                apartment VARCHAR(200) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                telephone VARCHAR(100) NOT NULL,
                status VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const userWillsVideoTableQuery = `
            CREATE TABLE IF NOT EXISTS user_will_video (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                video_family_status BOOLEAN NOT NULL,
                video_family_lawyer_state BOOLEAN NOT NULL,
                video_family_lawyer_name VARCHAR(50) NOT NULL,
                video_family_lawyer_relation VARCHAR(50) NOT NULL DEFAULT '家族・恋人',
                video_family_lawyer_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                video_family_url VARCHAR(100) NOT NULL,
                video_family_description TEXT NOT NULL,
                video_family_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                video_relation_status BOOLEAN NOT NULL,
                video_relation_lawyer_state BOOLEAN NOT NULL,
                video_relation_lawyer_name VARCHAR(50) NOT NULL,
                video_relation_lawyer_relation VARCHAR(50) NOT NULL DEFAULT '友人',
                video_relation_lawyer_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                video_relation_url VARCHAR(100) NOT NULL,
                video_relation_description TEXT NOT NULL,
                video_relation_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                video_other_status BOOLEAN NOT NULL,
                video_other_lawyer_state BOOLEAN NOT NULL,
                video_other_lawyer_name VARCHAR(50) NOT NULL,
                video_other_lawyer_relation VARCHAR(50) NOT NULL DEFAULT '他の',
                video_other_lawyer_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                video_other_url VARCHAR(100) NOT NULL,
                video_other_description TEXT NOT NULL,
                video_other_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `;

        const userWillsPdfTableQuery = `
            CREATE TABLE IF NOT EXISTS user_will_pdf (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                pdf_family_status BOOLEAN NOT NULL,
                pdf_family_lawyer_state BOOLEAN NOT NULL,
                pdf_family_lawyer_name VARCHAR(50) NOT NULL,
                pdf_family_lawyer_relation VARCHAR(50) NOT NULL DEFAULT '家族・恋人',
                pdf_family_lawyer_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                pdf_family_url VARCHAR(100) NOT NULL,
                pdf_family_description TEXT NOT NULL,
                pdf_family_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
                pdf_relation_status BOOLEAN NOT NULL,
                pdf_relation_lawyer_state BOOLEAN NOT NULL,
                pdf_relation_lawyer_name VARCHAR(50) NOT NULL,
                pdf_relation_lawyer_relation VARCHAR(50) NOT NULL DEFAULT '友人',
                pdf_relation_lawyer_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                pdf_relation_url VARCHAR(100) NOT NULL,
                pdf_relation_description TEXT NOT NULL,
                pdf_relation_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
                pdf_other_status BOOLEAN NOT NULL,
                pdf_other_lawyer_state BOOLEAN NOT NULL,
                pdf_other_lawyer_name VARCHAR(50) NOT NULL,
                pdf_other_lawyer_relation VARCHAR(50) NOT NULL DEFAULT '他の',
                pdf_other_lawyer_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                pdf_other_url VARCHAR(100) NOT NULL,
                pdf_other_description TEXT NOT NULL,
                pdf_other_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `;

        const userBornVideoTableQuery = `
            CREATE TABLE IF NOT EXISTS user_borns_video (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,

                video_child0_status BOOLEAN NOT NULL,
                video_child0_name VARCHAR(50) NOT NULL,
                video_child0_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                video_child0_url VARCHAR(100) NOT NULL,
                video_child0_description TEXT NOT NULL,
                video_child0_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                video_child1_status BOOLEAN NOT NULL,
                video_child1_name VARCHAR(50) NOT NULL,
                video_child1_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                video_child1_url VARCHAR(100) NOT NULL,
                video_child1_description TEXT NOT NULL,
                video_child1_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                video_child2_status BOOLEAN NOT NULL,
                video_child2_name VARCHAR(50) NOT NULL,
                video_child2_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                video_child2_url VARCHAR(100) NOT NULL,
                video_child2_description TEXT NOT NULL,
                video_child2_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                video_child3_status BOOLEAN NOT NULL,
                video_child3_name VARCHAR(50) NOT NULL,
                video_child3_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                video_child3_url VARCHAR(100) NOT NULL,
                video_child3_description TEXT NOT NULL,
                video_child3_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                video_child4_status BOOLEAN NOT NULL,
                video_child4_name VARCHAR(50) NOT NULL,
                video_child4_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                video_child4_url VARCHAR(100) NOT NULL,
                video_child4_description TEXT NOT NULL,
                video_child4_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
            `;

        const userBornPdfTableQuery = `
        CREATE TABLE IF NOT EXISTS user_borns_pdf (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,

            pdf_child0_status BOOLEAN NOT NULL,
            pdf_child0_name VARCHAR(50) NOT NULL,
            pdf_child0_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            pdf_child0_url VARCHAR(100) NOT NULL,
            pdf_child0_description TEXT NOT NULL,
            pdf_child0_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            pdf_child1_status BOOLEAN NOT NULL,
            pdf_child1_name VARCHAR(50) NOT NULL,
            pdf_child1_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            pdf_child1_url VARCHAR(100) NOT NULL,
            pdf_child1_description TEXT NOT NULL,
            pdf_child1_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            pdf_child2_status BOOLEAN NOT NULL,
            pdf_child2_name VARCHAR(50) NOT NULL,
            pdf_child2_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            pdf_child2_url VARCHAR(100) NOT NULL,
            pdf_child2_description TEXT NOT NULL,
            pdf_child2_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            pdf_child3_status BOOLEAN NOT NULL,
            pdf_child3_name VARCHAR(50) NOT NULL,
            pdf_child3_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            pdf_child3_url VARCHAR(100) NOT NULL,
            pdf_child3_description TEXT NOT NULL,
            pdf_child3_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            pdf_child4_status BOOLEAN NOT NULL,
            pdf_child4_name VARCHAR(50) NOT NULL,
            pdf_child4_birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            pdf_child4_url VARCHAR(100) NOT NULL,
            pdf_child4_description TEXT NOT NULL,
            pdf_child4_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
            `;

        const makeWillTableQuery = `
            CREATE TABLE IF NOT EXISTS user_make_will (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,

                will_status BOOLEAN NOT NULL,
                will_real_estate VARCHAR(300) NOT NULL,
                will_real_url VARCHAR(100) NOT NULL,
                will_real_description TEXT NOT NULL,
                will_update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
            );
                `;

        const info = `
            CREATE TABLE IF NOT EXISTS info (
                id INT AUTO_INCREMENT PRIMARY KEY,
                date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                title text NOT NULL,
                subTitle text NOT NULL,
                content text NOT NULL,
                kind VARCHAR(100) NOT NULL,
                senderInfo VARCHAR(100) NOT NULL,
                status BOOLEAN NOT NULL DEFAULT FALSE
            );
        `;

        const admin = `
            CREATE TABLE IF NOT EXISTS admin (
                id INT AUTO_INCREMENT PRIMARY KEY,
                access_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                email VARCHAR(100) NOT NULL DEFAULT 'admin@admin.com',
                password VARCHAR(100) NOT NULL DEFAULT 'admin'
            );
        `;

        const dailyUpdateData = `
            CREATE TABLE IF NOT EXISTS update_data (
                id INT AUTO_INCREMENT PRIMARY KEY,
                create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                database_path VARCHAR(300) NOT NULL,
                data_path VARCHAR(300) NOT NULL
            );
        `;

        const payForReadTable = `
            CREATE TABLE IF NOT EXISTS pay_data (
                id INT AUTO_INCREMENT PRIMARY KEY,
                create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                birth TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                address VARCHAR(200) NOT NULL,
                email VARCHAR(100) NOT NULL,
                relation_file VARCHAR(500) NOT NULL,
                death_file VARCHAR(200) NOT NULL,
                user_id INT NOT NULL,
                pay_state BOOLEAN NOT NULL
            );
        `;

       

        await connection.query(userTableQuery);
        // console.log('User table checked/created successfully');

        await connection.query(userWillsVideoTableQuery);
        // console.log('User userWillsVideoTableQuery table checked/created successfully');

        await connection.query(userWillsPdfTableQuery);
        // console.log('User userWillsPdfTableQuery table checked/created successfully');

        await connection.query(userBornVideoTableQuery);
        // console.log('User userBornVideoTableQuery table checked/created successfully');

        await connection.query(userBornPdfTableQuery);
        // console.log('User userBornPdfTableQuery table checked/created successfully');

        await connection.query(makeWillTableQuery);
        // console.log('User makeWillTableQuery table checked/created successfully');

        await connection.query(info);

        await connection.query(admin);

        await connection.query(dailyUpdateData);

        await connection.query(payForReadTable);

        // const insertInfoTable = `
        //     INSERT INTO info (date, title, subTitle, content, kind, senderInfo)
        //     VALUES
        //     ('2023-06-01', 'Title 1', 'SubTitle 1', 'Content 1', 'Kind 1', 'Sender 1')
        // `;

        // await connection.execute(insertDataQuery);

        // Release the connection back to the pool
        connection.release();
    } catch (error) {
        console.error('Error creating tables:', error.message);
        throw error;
    }
};

const getConnection = async () => {
    try {
        return await pool.promise().getConnection();
    } catch (error) {
        console.error('Error getting connection:', error.message);
        throw error;
    }
};

// Call the createTables function once when the module is required
createTables().then(() => {
    console.log('Database tables initialized');
}).catch(error => {
    console.error('Error during table initialization:', error.message);
});

module.exports = getConnection;
