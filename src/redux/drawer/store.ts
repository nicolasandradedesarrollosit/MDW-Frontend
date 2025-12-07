import {configureStore} from '@reduxjs/toolkit';
import drawerReducer from './sliceDrawer';

export const drawerStore = configureStore({
    reducer: {
        drawer: drawerReducer
    }
})

export type RootState = ReturnType<typeof drawerStore.getState>;
export type AppDispatch = typeof drawerStore.dispatch;