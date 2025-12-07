import { useDispatch, useSelector } from "react-redux";
import { setAuth, logOut, setLoading } from "@/redux/authUser/sliceAuth";
import { useEffect } from "react";
import { checkSession } from "@/services/userService";
import type { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const verifySession = async () => {
            console.log('useAuth - Verificando sesión...');
            try {
                const result = await checkSession();
                console.log('useAuth - Resultado checkSession:', result);
                if (result?.loggedIn) {
                    console.log('useAuth - Usuario autenticado');
                    dispatch(setAuth({
                        email: result.email || '',
                        name: result.name || '',
                        lastName: result.lastName || '',
                        age: result.age || null,
                        isAdmin: result.isAdmin || false,
                        features: result.features,
                        isAuthenticated: true,
                        loading: false,
                    }));
                    if (authState.features?.adminPanel) {
                        console.log('useAuth - Usuario es admin');
                        navigate('/admin');
                    }
                }
                else {
                    console.log('useAuth - Usuario NO autenticado');
                    dispatch(setAuth({
                        email: '',
                        name: '',
                        lastName: '',
                        age: null,
                        isAdmin: false,
                        features: undefined,
                        isAuthenticated: false,
                        loading: false,
                    }))
                }
            } catch (error) {
                console.error('useAuth - Error verificando sesión:', error);
                dispatch(setAuth({
                    email: '',
                    name: '',
                    lastName: '',
                    age: null,
                    isAdmin: false,
                    features: undefined,
                    isAuthenticated: false,
                    loading: false,
                }))
            }
        };
        verifySession();
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logOut());
    }
    
    return { 
        authState, 
        logOut: handleLogout, 
        setAuthState: (authData: any) => dispatch(setAuth(authData)), 
        setLoadingState: (loading: boolean) => dispatch(setLoading(loading)) 
    };
}