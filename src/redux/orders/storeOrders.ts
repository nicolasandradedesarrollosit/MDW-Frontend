import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./sliceOrders";

export const storeOrders = configureStore({
    reducer: {
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof storeOrders.getState>;
export type AppDispatch = typeof storeOrders.dispatch;