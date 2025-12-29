import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    checkIn: {
        photo: null,
        location: null,
        timestamp: null
    },
    setup: {
        preSetupPhoto: null,
        postSetupPhoto: null,
        notes: ''
    },
    status: 'pending',
    customerOTP: '',
    closingOTP: ''
};

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setCheckInData: (state, action) => {
            state.checkIn = { ...state.checkIn, ...action.payload };
        },
        setSetupData: (state, action) => {
            state.setup = { ...state.setup, ...action.payload };
        },
        setEventStatus: (state, action) => {
            state.status = action.payload;
        },
        setCustomerOTP: (state, action) => {
            state.customerOTP = action.payload;
        },
        setClosingOTP: (state, action) => {
            state.closingOTP = action.payload;
        },
        resetEvent: (state) => {
            return initialState;
        }
    }
});

export const {
    setCheckInData,
    setSetupData,
    setEventStatus,
    setCustomerOTP,
    setClosingOTP,
    resetEvent
} = eventSlice.actions;
export default eventSlice.reducer;