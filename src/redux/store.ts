import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authUser/sliceAuth";
import drawerReducer from "./drawerHome/sliceDrawer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        drawer: drawerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
