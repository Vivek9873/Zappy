import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    vendorName: {
        type: String,
        required: true
    },
    vendorPhone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'checked-in', 'in-progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    checkIn: {
        photo: String,
        location: {
            latitude: Number,
            longitude: Number
        },
        timestamp: Date
    },
    startOTP: {
        otp: String,
        verified: {
            type: Boolean,
            default: false
        },
        verifiedAt: Date
    },
    setup: {
        preSetupPhoto: String,
        postSetupPhoto: String,
        notes: String,
        completedAt: Date
    },
    completionOTP: {
        otp: String,
        verified: {
            type: Boolean,
            default: false
        },
        verifiedAt: Date
    },
    completedAt: Date
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;