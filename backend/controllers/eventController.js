import Event from '../models/Event.js';

// Generate random 4-digit OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Vendor Check-In
export const checkInVendor = async (req, res) => {
    try {
        const { eventId, latitude, longitude, timestamp } = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        if (!eventId || !latitude || !longitude || !photo) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const event = await Event.findOne({ eventId });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        event.checkIn = {
            photo,
            location: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            },
            timestamp: timestamp || new Date()
        };
        event.status = 'checked-in';

        await event.save();

        res.status(200).json({
            success: true,
            message: 'Check-in successful',
            event
        });

    } catch (error) {
        console.error('Check-in error:', error);
        res.status(500).json({
            success: false,
            message: 'Check-in failed',
            error: error.message
        });
    }
};

// Send OTP to Customer
export const sendOTP = async (req, res) => {
    try {
        const { eventId, type } = req.body;

        if (!eventId || !type) {
            return res.status(400).json({
                success: false,
                message: 'Event ID and type are required'
            });
        }

        const event = await Event.findOne({ eventId });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        const otp = generateOTP();

        if (type === 'start') {
            event.startOTP = {
                otp,
                verified: false
            };
        } else if (type === 'complete') {
            event.completionOTP = {
                otp,
                verified: false
            };
        }

        await event.save();

        // In production, send OTP via SMS/Email
        console.log(`📱 OTP for ${type}: ${otp}`);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp // Remove in production
        });

    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
            error: error.message
        });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { eventId, otp, type } = req.body;

        if (!eventId || !otp || !type) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const event = await Event.findOne({ eventId });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        let isValid = false;

        if (type === 'start') {
            isValid = event.startOTP.otp === otp;
            if (isValid) {
                event.startOTP.verified = true;
                event.startOTP.verifiedAt = new Date();
                event.status = 'in-progress';
            }
        } else if (type === 'complete') {
            isValid = event.completionOTP.otp === otp;
            if (isValid) {
                event.completionOTP.verified = true;
                event.completionOTP.verifiedAt = new Date();
                event.status = 'completed';
                event.completedAt = new Date();
            }
        }

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        await event.save();

        res.status(200).json({
            success: true,
            message: 'OTP verified successfully',
            event
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'OTP verification failed',
            error: error.message
        });
    }
};

// Upload Setup Photos
export const uploadSetupPhotos = async (req, res) => {
    try {
        const { eventId, notes } = req.body;
        const preSetupPhoto = req.files?.preSetupPhoto?.[0];
        const postSetupPhoto = req.files?.postSetupPhoto?.[0];

        if (!eventId || !preSetupPhoto || !postSetupPhoto) {
            return res.status(400).json({
                success: false,
                message: 'Event ID and both photos are required'
            });
        }

        const event = await Event.findOne({ eventId });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        event.setup = {
            preSetupPhoto: `/uploads/${preSetupPhoto.filename}`,
            postSetupPhoto: `/uploads/${postSetupPhoto.filename}`,
            notes: notes || '',
            completedAt: new Date()
        };

        await event.save();

        res.status(200).json({
            success: true,
            message: 'Setup photos uploaded successfully',
            event
        });

    } catch (error) {
        console.error('Upload setup photos error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload setup photos',
            error: error.message
        });
    }
};

// Complete Event
export const completeEvent = async (req, res) => {
    try {
        const { eventId, otp } = req.body;

        if (!eventId || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Event ID and OTP are required'
            });
        }

        const event = await Event.findOne({ eventId });

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        if (event.completionOTP.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        event.completionOTP.verified = true;
        event.completionOTP.verifiedAt = new Date();
        event.status = 'completed';
        event.completedAt = new Date();

        await event.save();

        res.status(200).json({
            success: true,
            message: 'Event completed successfully',
            event
        });

    } catch (error) {
        console.error('Complete event error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to complete event',
            error: error.message
        });
    }
};

// Get Event Details
export const getEventDetails = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findOne({ eventId }).populate('vendorId');

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            event
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch event details',
            error: error.message
        });
    }
};