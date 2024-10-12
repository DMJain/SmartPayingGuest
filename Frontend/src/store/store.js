import { configureStore } from '@reduxjs/toolkit';

import adReducer from './slices/adSlice';
import locationReducer from './slices/locationSlice';
import bookingSlice from './slices/bookingSlice';
import chatSlice from './slices/chatSlice';


export const store = configureStore({
    reducer: {
        ad: adReducer,
        location: locationReducer,
        booking: bookingSlice,
        chat: chatSlice,
    },
    devTools: true,
})