const newbornController = require('../controllers/borncontroller');
const router = require('express').Router();

router.post('/born', newbornController.insertBorn);
router.post('/updateBornsVideo', newbornController.updateBornsVideo);
router.post('/updateBornsPdf', newbornController.updateBornsPdf);
router.post('/createBornsPDF', newbornController.createBornsPDF);
// router.post('/Kidcheck', newbornController.Kidcheck);
// router.post('/KidPDFcheck', newbornController.KidPDFcheck);
// router.post('/KidPDF', newbornController.KidPDF);
// router.post('/vcheck', newbornController.vcheck);
// router.post('/kidyoutube', newbornController.InsertNewBornYoutube);
// router.post('/kidVideoCheck', newbornController.kidVideoCheck);
// router.post('/kidVideo', newbornController.kidVideo);

module.exports = router;