import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name: null,
        parish: null,
        email: null
    },
    reducers: {
        setAuthDetails: (state: any, action: any) => {
            const {name, parish, email} = action.payload
            state.name = name;
            state.parish = parish;
            state.email = email;
        },
        clearAuthDetails: (state: any) => {
            state.name = null;
            state.parish = null;
            state.email = null;
        }
    }
})

export const {setAuthDetails, clearAuthDetails} = authSlice.actions
export default authSlice.reducer