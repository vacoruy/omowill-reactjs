const paymentController = require('../controllers/payController');
const router = require('express').Router();

// router.post('/payConfig', paymentController.config);
router.post('/process-payment', paymentController.paymentIntent);

module.exports = router;