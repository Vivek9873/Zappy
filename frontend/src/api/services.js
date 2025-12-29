import API from './axios';

export const vendorLogin = async (data) => {
    const response = await API.post('/vendor/login', data);
    return response.data;
};

export const checkInVendor = async (formData) => {
    const response = await API.post('/event/checkin', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const sendOTP = async (data) => {
    const response = await API.post('/event/send-otp', data);
    return response.data;
};

export const verifyOTP = async (data) => {
    const response = await API.post('/event/verify-otp', data);
    return response.data;
};

export const uploadSetupPhotos = async (formData) => {
    const response = await API.post('/event/setup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const completeEvent = async (data) => {
    const response = await API.post('/event/complete', data);
    return response.data;
};