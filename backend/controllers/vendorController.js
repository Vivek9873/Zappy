import Vendor from '../models/Vendor.js';
import Event from '../models/Event.js';
import jwt from 'jsonwebtoken';

// Vendor Login (Mocked Authentication)
export const vendorLogin = async (req, res) => {
    try {
        const { name, eventId, phone } = req.body;

        // Validation
        if (!name || !eventId || !phone) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Find or create vendor
        let vendor = await Vendor.findOne({ phone });

        if (!vendor) {
            vendor = await Vendor.create({ name, phone });
        }

        // Check if event already exists
        let event = await Event.findOne({ eventId });

        if (event && event.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Event already completed'
            });
        }

        if (!event) {
            // Create new event
            event = await Event.create({
                eventId,
                vendorId: vendor._id,
                vendorName: name,
                vendorPhone: phone,
                status: 'pending'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                vendorId: vendor._id,
                eventId: event.eventId,
                name: vendor.name
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            vendor: {
                id: vendor._id,
                name: vendor.name,
                phone: vendor.phone
            },
            event: {
                eventId: event.eventId,
                status: event.status
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
};

// Get Vendor Profile
export const getVendorProfile = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.user.vendorId);

        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: 'Vendor not found'
            });
        }

        res.status(200).json({
            success: true,
            vendor
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch vendor profile',
            error: error.message
        });
    }
};