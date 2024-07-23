const fileController = require('../controllers/fileController');
const router = require('express').Router();

const multer = require('multer');
const path = require('path');

const filePath = path.join(__dirname, '../../public/data/');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filePath); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Define the filename for uploaded files
    }
});


const upload = multer({ storage: storage });


router.post('/fileUpload', upload.single('file'), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
});

module.exports = router;