import {useDispatch, useSelector} from "react-redux";
import { setUser } from "@/redux/users/sliceUsers";
import { useEffect } from "react";
import { getUsers } from "@/services/userService";
import type { RootState } from "@/redux/store";

export const useUsers = () => {
    const dispatch = useDispatch();
    const usersState = useSelector((state: RootState) => state.users);

    useEffect(() => {
        const fetchUsers = async () => {
            console.log('useUsers - Fetching users...');
            try {
                const users = await getUsers();
                dispatch(setUser(users));
            } catch (error) {
                console.error('useUsers - Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [dispatch]);

    return {
        users: usersState.users,
        loading: usersState.loading,
        usersState
    }
}