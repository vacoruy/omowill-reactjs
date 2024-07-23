const infoController = require('../controllers/infocontroller');
const router = require('express').Router();

router.post('/getInfo', infoController.getInfo);
router.post('/updateContactStatus', infoController.updateContactStatus);

module.exports = router;