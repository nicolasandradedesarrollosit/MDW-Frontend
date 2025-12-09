import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authUser/sliceAuth";
import drawerReducer from "./drawer/sliceDrawer";
import productsReducer from "./products/sliceProducts";
import modalReducer from "./modal/sliceModal";
import userReducer from "./users/sliceUsers";
import categoriesReducer from "./categories/sliceCategories";
import productSizeReducer from "./productSize/sliceProductSize";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        drawer: drawerReducer,
        products: productsReducer,
        modal: modalReducer,
        users: userReducer,
        categories: categoriesReducer,
        productSize: productSizeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
