import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    eventId: '',
    phone: '',
    token: null
};

const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {
        setVendorData: (state, action) => {
            return { ...state, ...action.payload };
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        resetVendor: (state) => {
            return initialState;
        }
    }
});

export const { setVendorData, setToken, resetVendor } = vendorSlice.actions;
export default vendorSlice.reducer;