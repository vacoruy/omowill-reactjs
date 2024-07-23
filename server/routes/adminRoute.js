const adminController = require('../controllers/adminController');
const router = require('express').Router();

router.post('/adminLogin', adminController.getLoginInfo);
router.post('/getAllUser', adminController.getAllUser);
router.post('/getAllInfo', adminController.getAllInfo);

router.post('/updateInfo', adminController.updateInfo);
router.post('/addNewInfo', adminController.addNewInfo);
router.post('/getAdminInfo', adminController.getAdminInfo);
router.post('/updateAdminInfo', adminController.updateAdminInfo);

module.exports = router;