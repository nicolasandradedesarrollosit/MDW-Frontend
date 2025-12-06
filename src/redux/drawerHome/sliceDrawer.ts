import { createSlice } from "@reduxjs/toolkit";

export interface DrawerState {
    open: boolean;
}

const initialState: DrawerState = {
    open: false,
};

const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        openDrawer: (state) => {
            state.open = true;
        },
        closeDrawer: (state) => {
            state.open = false;
        },
        alternateDrawer: (state) => {
            state.open = !state.open;
        }
    }
});

export const {openDrawer, closeDrawer, alternateDrawer} = drawerSlice.actions;
export default drawerSlice.reducer;

export const selectDrawerOpen = (state: { drawer: DrawerState }) => state.drawer.open;