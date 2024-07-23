const path = require('path');

exports.removeFile = (req, res) => {
    const filePath = path.join(__dirname, '../../public', req,body.fileInfo);;
    // const filePath = path.join(__dirname, 'uploads', filename);
  
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).send({ message: 'File deletion failed', error: err.message });
      }
      res.send({ message: 'File deleted successfully' });
    });
};
