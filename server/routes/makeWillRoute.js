const makeWillController = require('../controllers/makeWillController');
const router = require('express').Router();

router.post('/getMakeWill', makeWillController.getMakeWill);
router.post('/updateWills', makeWillController.updateWills);
router.post('/createWills', makeWillController.createWills);

module.exports = router;