import {configureStore} from '@reduxjs/toolkit';
import categoriesReducer from './sliceCategories';

export const storeCategories = configureStore({
    reducer: {
        categories: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof storeCategories.getState>;
export type AppDispatch = typeof storeCategories.dispatch;