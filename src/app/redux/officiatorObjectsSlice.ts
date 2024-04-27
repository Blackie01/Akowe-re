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
        }
    }
})

export const {setOfficiatorObject, clearOfficiatorObject} = officiatorObject.actions
export default officiatorObject.reducer