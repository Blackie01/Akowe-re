import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import ranksReducer from './ranksSlice'
import officiatorObjectReducer from './officiatorObjectsSlice'
import notificationReducer from './notificationSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    ranks: ranksReducer,
    officiatorObject: officiatorObjectReducer,
    notification: notificationReducer
})

export default rootReducer