const paymentController = require('../controllers/payController');
const router = require('express').Router();

router.post('/payConfig', paymentController.config);
router.post('/create-payment-intent', paymentController.paymentIntent);

module.exports = router;