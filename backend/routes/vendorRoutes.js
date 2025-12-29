import express from 'express';
import { vendorLogin, getVendorProfile } from '../controllers/vendorController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', vendorLogin);
router.get('/profile', authenticate, getVendorProfile);

export default router;