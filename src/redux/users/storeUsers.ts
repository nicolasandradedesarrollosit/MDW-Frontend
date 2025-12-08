import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./sliceUsers";

export const storeUsers = configureStore({
    reducer: {
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof storeUsers.getState>;
export type AppDispatch = typeof storeUsers.dispatch;