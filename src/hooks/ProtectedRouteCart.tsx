import {Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/authUser/sliceAuth";

interface ProtectedRouteCartProps {
    children: React.ReactNode;
}

export const ProtectedRouteCart = ({ children }: ProtectedRouteCartProps) => {
    const auth = useSelector(selectAuth);
    const { isAuthenticated } = auth;
    if (!isAuthenticated) return <Navigate to="/" replace />;

    if(!localStorage.getItem('cart')) return <Navigate to="/" replace />;
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if(Object.keys(cart).length === 0) return <Navigate to="/" replace />;
    return <>{children}</>;
}