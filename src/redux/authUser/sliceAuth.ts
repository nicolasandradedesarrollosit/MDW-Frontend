import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface AuthUserState {
    id: string;
    email: string;
    name: string;
    lastName: string;
    age?: number | string | null;
    isAdmin?: boolean;
    features?: {
        adminPanel?: boolean;
    };
    isAuthenticated: boolean;
    loading: boolean;
}

export const initialState: AuthUserState = {
    id: '',
    email: '',
    name: '',
    lastName: '',
    age: null,
    isAdmin: false,
    features: undefined,
    isAuthenticated: false,
    loading: true,
};

const authSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthUserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.lastName = action.payload.lastName;
            state.age = action.payload.age;
            state.isAdmin = action.payload.isAdmin;
            state.features = action.payload.features;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.loading = action.payload.loading;
        },
        logOut: (state) => {
            state.email = '';
            state.name = '';
            state.lastName = '';
            state.age = null;
            state.isAdmin = false;
            state.features = undefined;
            state.isAuthenticated = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const { setAuth, logOut, setLoading } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: { auth: AuthUserState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthUserState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthUserState }) => state.auth.loading;