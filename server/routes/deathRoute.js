const deathController = require('../controllers/deathcontroller');
const router = require('express').Router();

// router.post('/getDeathVideo', deathController.getDeathVideos);
router.post('/updataDeathPdfs', deathController.updataDeathPdfs);
router.post('/removeFile', deathController.removeFile);
router.post('/createFile', deathController.createFile);
// router.post('/init', deathController.initpage);
// router.post('/youtube', deathController.youtebe);
// router.post('/deathCheck', deathController.check);
// router.post('/videoCheck', deathController.videoCheck);
// router.post('/pdfCheck', deathController.pdfCheck);

module.exports = router;