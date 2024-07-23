const crypto = require('crypto');

function calculateMD5(val) {
    const md5Hash = crypto.createHash('md5');

    // Update the hash object with the input data
    md5Hash.update(val);
  
    // Get the hexadecimal representation of the hash
    const md5Hex = md5Hash.digest('hex');
  
    return md5Hex;
}

module.exports = calculateMD5;