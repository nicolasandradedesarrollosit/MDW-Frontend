import { configureStore } from '@reduxjs/toolkit';
import productReducer from './sliceProducts';

export const storeProducts = configureStore({
    reducer: {
        product: productReducer,
    },
});

export type RootState = ReturnType<typeof storeProducts.getState>;
export type AppDispatch = typeof storeProducts.dispatch;