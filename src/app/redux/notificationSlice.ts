import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
    message: string;
    backgroundColor?: string;
}

export interface NotificationState {
    data: Notification;
    messageId: number;
}

const initialState = {
    data: { message: ''},
    messageId: 1,
}

const notificationSlice = createSlice({
    name: 'notification', 
    initialState, 
    reducers: {
        newNotification: (state, action: PayloadAction<Notification>) => {
            state.data = action.payload;
            state.messageId = Math.floor(Math.random() * 200000)
        },
        clearNotification: () => initialState
    } 
})

export const { newNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer