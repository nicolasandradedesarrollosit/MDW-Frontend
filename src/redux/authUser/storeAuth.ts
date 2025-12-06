import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./sliceAuth";

export const storeAuth = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof storeAuth.getState>;
export type AppDispatch = typeof storeAuth.dispatch;