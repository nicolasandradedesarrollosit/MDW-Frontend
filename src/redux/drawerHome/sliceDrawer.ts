import { createSlice } from "@reduxjs/toolkit";

export interface DrawerState {
    open: Record<string, boolean>;
}

const initialState: DrawerState = {
    open: {} as Record<string, boolean>,
};

const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        openDrawer: (state, action) => {
            state.open[action.payload] = true;
        },
        closeDrawer: (state, action) => {
            state.open[action.payload] = false;
        },
        alternateDrawer: (state, action) => {
            state.open[action.payload] = !state.open[action.payload];
        }
    }
});

export const {openDrawer, closeDrawer, alternateDrawer} = drawerSlice.actions;
export default drawerSlice.reducer;

export const selectDrawerOpen = (state: { drawer: DrawerState }) => state.drawer.open;