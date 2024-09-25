import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    date: null,
    totalPrice: null,
    orderId: null,
}

const bookingSlice = createSlice({
    name:"booking",
    initialState,
    reducers: {
        setBookingDetails: (state, action) => {
            state.date = action.payload.date;
            state.totalPrice = action.payload.totalPrice;
        },
        setOrderID: (state, action) => {
            state.orderId = action.payload.orderId;
        }
    },
});

export const { setBookingDetails, setOrderID } = bookingSlice.actions;

export default bookingSlice.reducer;