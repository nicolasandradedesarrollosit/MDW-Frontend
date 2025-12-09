import { configureStore } from "@reduxjs/toolkit";
import productSizeReducer from "./sliceProductSize";

export const storeProductSize = configureStore({
    reducer: {
        productSizes: productSizeReducer,
    },
});

export type RootState = ReturnType<typeof storeProductSize.getState>;
export type AppDispatch = typeof storeProductSize.dispatch;