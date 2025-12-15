import { useDispatch, useSelector } from "react-redux";
import { setAuth, logOut, setLoading } from "@/redux/authUser/sliceAuth";
import { useEffect } from "react";
import { checkSession } from "@/services/userService";
import type { RootState } from "@/redux/store";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
                        id: result.id || '',
                        email: result.email || '',
                        name: result.name || '',
                        lastName: result.lastName || '',
                        age: result.age || null,
                        isAdmin: result.isAdmin || false,
                        features: result.features,
                        isAuthenticated: true,
                        loading: false,
                    }));
                    if (result.features?.adminPanel) {
                        console.log('useAuth - Usuario es admin');
                        // Solo redirigimos a /admin si el usuario NO está ya dentro de una ruta /admin
                        // Esto evita que el hook fuerce una redirección cada vez que se monta un componente
                        // dentro del panel de administración (p. ej. al navegar a /admin/products).
                        if (!location.pathname.startsWith('/admin')) {
                            console.log('useAuth - Navegando a /admin ya que el usuario tiene el feature adminPanel');
                            navigate('/admin');
                        }
                    }
                }
                else {
                    console.log('useAuth - Usuario NO autenticado');
                    dispatch(setAuth({
                        id: '',
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
                    id: '',
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
        if (authState.loading) {
            verifySession();
        }
    }, [dispatch, navigate, location, authState.loading]);

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