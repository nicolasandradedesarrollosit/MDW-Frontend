import {useAuth} from "@/hooks/useAuth";
import DrawerCartAuth from "./DrawerCartAuth";
import DrawerCartNotAuth from "./DrawerCartNotAuth";

export default function DrawerCartFather() {
    const {authState: {isAuthenticated, loading}} = useAuth();

    console.log('DrawerCartFather - isAuthenticated:', isAuthenticated, 'loading:', loading);
    return (
        <>
            {!loading && (
                isAuthenticated ? <DrawerCartAuth /> : <DrawerCartNotAuth />
            )}
        </>
    )
}