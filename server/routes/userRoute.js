const userController = require('../controllers/userController');
const router = require('express').Router();

router.post('/login', userController.getUserLogin);
router.post('/register', userController.userRegister);
router.post('/forgot', userController.forgotPwd);
router.post('/reset', userController.resetPwd);
router.post('/members', userController.getMembers);
router.post('/membersBlock', userController.block);
router.post('/sendContact', userController.contact);
router.post('/getUserData', userController.getUserData);
router.post('/updateWillsVideoData', userController.updateWillsVideoData);
router.post('/updateUserInfo', userController.updateUserInfo);
router.post('/confirmRequestUser', userController.confirmRequestUser);
router.post('/payForReadDoc', userController.payForReadDoc);
router.post('/checkPayStatu', userController.checkPayStatu);
router.post('/getPaidUserList', userController.getPaidUserList);
router.post('/getRequestUserINfo', userController.getRequestUserINfo);

module.exports = router;