import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalID: "",
    createAt: "",
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, nationalID) {
                return { payload: { fullName, nationalID, createAt: new Date().toISOString() } };
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.nationalID = action.payload.nationalID;
                state.createAt = action.payload.createAt;
            }
        },
        updateName(state, action) {
            state.fullName = action.payload;
        }
    }
});

export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;