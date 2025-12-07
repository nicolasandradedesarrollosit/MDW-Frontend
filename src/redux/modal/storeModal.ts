import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./sliceModal";

export const modalStore = configureStore({
    reducer: {
        modal: modalReducer,
    },
});

export type RootStateModal = ReturnType<typeof modalStore.getState>;
export type AppDispatchModal = typeof modalStore.dispatch;
