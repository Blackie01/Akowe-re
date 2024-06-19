import { createSlice } from "@reduxjs/toolkit";

const officiatorObject = createSlice({
    name: 'officiatorObject',
    initialState: {
       collectOfficiatorObject: []
    },
    reducers: {
        setOfficiatorObject: (state: any, action: any) => {
            state.collectOfficiatorObject.push(action.payload)
        },
        clearOfficiatorObject: (state) => {
            state.collectOfficiatorObject = []
        },
        deleteOfficiatorObjectById: (state, action) => {
            state.collectOfficiatorObject = state.collectOfficiatorObject.filter((obj: any) => obj.id !== action.payload);
          }
    }
})

export const {setOfficiatorObject, clearOfficiatorObject, deleteOfficiatorObjectById} = officiatorObject.actions
export default officiatorObject.reducer