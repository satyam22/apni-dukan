import express from 'express';
import { verifyCard, verifyNetbanking, verifyUpi, verifyOtp } from './../controllers/payment';

const router = express.Router();


router.post('/verify/card', verifyCard);
router.post('/verify/netbanking', verifyNetbanking);
router.post('/verify/upi', verifyUpi);
router.post('/verify/otp', verifyOtp)

module.exports = router;