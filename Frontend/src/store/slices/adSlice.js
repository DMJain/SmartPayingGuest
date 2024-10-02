import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from "../../api";

const initialState = {
    _id: null,
    name: null,
    description: null,
    price: null,
    imageURLs: null,
    amenities: null,
    lat: null,
    lon: null,
    isLoading: false,
    location: null,
    owner_id: null,
}

export const fetchAd = createAsyncThunk(
    'ad/fetchAd',
    async (AdId) => {
        try {
            const {data} = await apiInstance.get(`user/property/${AdId}`);
            const ad = data.data;
            return ad;
        } catch (error) {
            console.log('error', error);
        }
    }
);

const adSlice = createSlice({
    name:"ad",
    initialState,
    reducers: {
        setAdsDataAfterCreation : (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
            state.price = action.payload.price;
            state.imageURLs = action.payload.imageURLs;
            state.amenities = action.payload.amenities;
            state.owner = action.payload.owner;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAd.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAd.fulfilled, (state, action) => {
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.price = action.payload.price;
            state.imageURLs = action.payload.images;
            state.amenities = action.payload.amenities;
            state.owner = action.payload.ownerName;
            state.isLoading = false;
        });
    }
});

export const {setAdsDataAfterCreation} = adSlice.actions

export default adSlice.reducer;