import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const fetchAddress = createAsyncThunk("user/fetchAddress", async function () {
    const { coords } = await getPosition();
    const position = {
        latitude: coords.latitude,
        longitude: coords.longitude,
    }

    const address = await getAddress(position);
    const addressString = `${address?.locality}, ${address?.city} ${address?.postcode}, ${address.countryName}`;

    return { position, addressString };
})

const initialState = {
    username: "",
    loadingAddress: false,
    errorLoadingAddress: "",
    position: {},
    address: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateName(state, action) {
            state.username = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.pending, (state) => {
            state.loadingAddress = true;
            state.errorLoadingAddress = "";
        });
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.loadingAddress = false;
            state.position = action.payload.position;
            state.address = action.payload.addressString;
        });
        builder.addCase(fetchAddress.rejected, (state, action) => {
            state.loadingAddress = false;
            state.errorLoadingAddress = action.error.message;
        });
    }
});

export default userSlice.reducer;
export const { updateName } = userSlice.actions;
export { fetchAddress }