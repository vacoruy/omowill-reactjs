const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

const mysql = require('mysql2'); // Import MySQL library
const archiver = require('archiver');


const pool = mysql.createPool({
    host: process.env.REACT_APP_DATABASE_HOST_URL,
    user: process.env.REACT_APP_DATABASE_USERNAME,
    password: process.env.REACT_APP_DATABASE_PASSWORD,
    database: process.env.REACT_APP_DATABASE_NAME
});

const deleteBackupfileLimit = 30;

const backupDatabase = () => {
    const dbUser = process.env.REACT_APP_DATABASE_USERNAME;
    const dbPassword = process.env.REACT_APP_DATABASE_PASSWORD;
    const dbName = process.env.REACT_APP_DATABASE_NAME;

    const backupDir = path.join(__dirname, '../../public/backups');

    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
    }

    // function generateRandomString(length) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     let result = '';
    //     const charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * charactersLength));
    //     }
    //     return result;
    // }

    const backupFile = path.join(backupDir, `${dbName}_backup_${new Date().toISOString().split('T')[0]}.sql`);

    const command = `mysqldump -u ${dbUser} -p${dbPassword} ${dbName} > ${backupFile}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating backup: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
            return;
        }

        // Zip specific directories
        const zipTargetPath = path.join(__dirname, '../../public/data');

        const directoriesToZip = [zipTargetPath];

        const zipFileName = `directories_backup_${new Date().toISOString().split('T')[0]}}.zip`;
        const zipFilePath = path.join(backupDir, zipFileName);
        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver('zip', {
            zlib: { level: 9 } // Set compression level
        });

        output.on('close', () => {
            console.log(`Directories zipped: ${zipFilePath}`);
            // Insert backup information into MySQL database
            // insertBackupInfo(backupFileName, backupDir, zipFileName, zipFilePath);
        });

        archive.on('error', (err) => {
            console.error('Error zipping directories:', err);
        });

        archive.pipe(output);
        directoriesToZip.forEach((directory) => {
            archive.directory(directory, path.basename(directory));
        });
        archive.finalize();

        // Insert backup information into MySQL database
        const sql = 'INSERT INTO update_data (database_path, data_path) VALUES (?, ?)';

        pool.query(sql, [backupFile, zipFilePath], (err, result) => {
            if (err) {
                console.error('Error inserting backup information into database:', err);
                return;
            }

            console.log('Backup information inserted into database:');

            // Remove old backups if there are more than 30
            fs.readdir(backupDir, (err, files) => {
                if (err) {
                    console.error(`Error reading backup directory: ${err.message}`);
                    return;
                }

                const sqlFiles = files.filter(file => file.endsWith('.sql'));
                const zipFiles = files.filter(file => file.endsWith('.zip'));

                if (zipFiles.length > deleteBackupfileLimit) {
                    const filesToRemove = zipFiles
                        .sort((a, b) => {
                            const aTime = fs.statSync(path.join(backupDir, a)).mtime;
                            const bTime = fs.statSync(path.join(backupDir, b)).mtime;
                            return aTime - bTime;
                        })
                        .slice(0, zipFiles.length - deleteBackupfileLimit);

                    filesToRemove.forEach(file => {
                        fs.unlink(path.join(backupDir, file), (err) => {
                            if (err) {
                                console.error(`Error deleting old backup file: ${err.message}`);
                                return;
                            }
                            console.log(`Deleted old backup file: ${file}`);
                        });
                    });
                }


                if (sqlFiles.length > deleteBackupfileLimit) {
                    const filesToRemove = sqlFiles
                        .sort((a, b) => {
                            const aTime = fs.statSync(path.join(backupDir, a)).mtime;
                            const bTime = fs.statSync(path.join(backupDir, b)).mtime;
                            return aTime - bTime;
                        })
                        .slice(0, sqlFiles.length - deleteBackupfileLimit);

                    filesToRemove.forEach(file => {
                        fs.unlink(path.join(backupDir, file), (err) => {
                            if (err) {
                                console.error(`Error deleting old backup file: ${err.message}`);
                                return;
                            }
                            console.log(`Deleted old backup file: ${file}`);
                        });
                    });
                }


            });

            const sqlCount = 'SELECT COUNT(*) AS count FROM update_data';

            pool.query(sqlCount, (err, rows) => {
                if (err) {
                    console.error('Error getting count of entries:', err);
                    return;
                }

                const count = rows[0].count;
                console.log('Count of entries:', count);

                // If count exceeds 30, delete oldest entries along with their corresponding backup files
                if (count > deleteBackupfileLimit) {
                    const sqlDelete = 'DELETE FROM update_data ORDER BY id ASC LIMIT ?';

                    const filesToDelete = count - deleteBackupfileLimit;

                    pool.query(sqlDelete, [filesToDelete], (err, result) => {
                        if (err) {
                            console.error('Error deleting old entries:', err);
                            return;
                        }
                        console.log('Deleted old entries:');

                        // Delete corresponding backup files
                        // (Implement logic to delete backup files here)
                    });
                }
            });

        });

        console.log(`Database backup created: ${backupFile}`);
    });
};

// Schedule the backup to run daily at midnight
cron.schedule('0 0 * * *', backupDatabase);

module.exports = backupDatabase;
