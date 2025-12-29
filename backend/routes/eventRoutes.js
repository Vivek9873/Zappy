import express from 'express';
import {
    checkInVendor,
    sendOTP,
    verifyOTP,
    uploadSetupPhotos,
    completeEvent,
    getEventDetails
} from '../controllers/eventController.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/checkin', authenticate, upload.single('photo'), checkInVendor);
router.post('/send-otp', authenticate, sendOTP);
router.post('/verify-otp', authenticate, verifyOTP);
router.post('/setup', authenticate, upload.fields([
    { name: 'preSetupPhoto', maxCount: 1 },
    { name: 'postSetupPhoto', maxCount: 1 }
]), uploadSetupPhotos);
router.post('/complete', authenticate, completeEvent);
router.get('/:eventId', authenticate, getEventDetails);

export default router;