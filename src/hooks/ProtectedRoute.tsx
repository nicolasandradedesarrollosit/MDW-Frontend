import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { selectAuth } from "@/redux/authUser/sliceAuth";
import { useRef, useEffect } from "react";

interface ProtectedRouteProps {
    requireAdmin?: boolean;
    children: React.ReactNode;
}

export const ProtectedRoute = ({ requireAdmin = false, children }: ProtectedRouteProps) => {
    const auth = useSelector(selectAuth);
    const { isAuthenticated, loading, isAdmin } = auth;

    const logRef = useRef({ loadingLogged: false });
    useEffect(() => {
        if (loading && !logRef.current.loadingLogged) {
            console.log('ProtectedRoute - Cargando estado de autenticación...');
            logRef.current.loadingLogged = true;
        }
        if (!loading) {
            logRef.current.loadingLogged = false;
        }
    }, [loading]);

    if (loading) {
        return null; 
    }

    if (!isAuthenticated) {
        console.log('ProtectedRoute - Usuario no autenticado, redirigiendo a /');
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && !isAdmin) {
        console.log('ProtectedRoute - Usuario no es admin, redirigiendo a /');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}