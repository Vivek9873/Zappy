import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: 'login',
    generatedOTP: '',
    loading: false,
    error: null
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setGeneratedOTP: (state, action) => {
            state.generatedOTP = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetApp: (state) => {
            return initialState;
        }
    }
});

export const { setCurrentStep, setGeneratedOTP, setLoading, setError, resetApp } = appSlice.actions;
export default appSlice.reducer;