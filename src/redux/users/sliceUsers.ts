import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
    name: string;
    lastName: string;
    email: string;
    edad: number;
    isAdmin: boolean;
}

export interface UsersState {
    users: User[];
    loading: boolean;
}

export const initialState: UsersState = {
    users: [],
    loading: false
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

export const { setUser, setLoading } = usersSlice.actions;
export default usersSlice.reducer;

export const selectUsers = (state: { users: UsersState }) => state.users.users;
export const selectUsersLoading = (state: { users: UsersState }) => state.users.loading;