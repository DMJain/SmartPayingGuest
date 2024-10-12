import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    userId: null,
    ownerId: null,
    roomId: null,
    propertyId: null,
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers: {
        setRoomId: (state, action) => {
            state.userId = action.payload.userId;
            state.ownerId = action.payload.ownerId;
            state.propertyId = action.payload.propertyId;
        },

    },
});

export const { setRoomId } = chatSlice.actions;

export default chatSlice.reducer;