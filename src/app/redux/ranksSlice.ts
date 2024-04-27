import { createSlice } from "@reduxjs/toolkit";

const ranksSlice = createSlice({
    name: 'ranks',
    initialState: {
        ranks: null,
    },
    reducers: {
        setRanks: (state, action) => {
            state.ranks = action.payload
        },

        clearRanks: (state) => {
            state.ranks = null
        }
    }
})

export const {setRanks,clearRanks} = ranksSlice.actions
export default ranksSlice.reducer