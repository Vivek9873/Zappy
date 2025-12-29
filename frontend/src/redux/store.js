import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import vendorReducer from './slices/vendorSlice';
import eventReducer from './slices/eventSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        vendor: vendorReducer,
        event: eventReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});