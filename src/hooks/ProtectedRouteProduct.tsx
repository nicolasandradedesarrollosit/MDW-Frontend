import { Navigate, useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import { selectProducts, selectProductsLoading } from '@/redux/products/sliceProducts';

interface ProtectedRouteProps {
    requireIDProduct?: boolean;
    children: React.ReactNode;
}

export const ProtectedRouteProduct = ({ requireIDProduct = false, children }: ProtectedRouteProps) => {
    const products = useSelector(selectProducts);
    const productsLoading = useSelector(selectProductsLoading);
    // whether we've already fetched products at least once
    const productsFetched = useSelector((state: any) => state.products?.fetched ?? false);

    const { id: productId } = useParams() as { id?: string };

    const productExists = (id?: string): boolean => {
        if (!id) return false;
        return products.some(product => (product as any)._id === id || (product as any).id === id);
    }

    if (requireIDProduct) {
        // If products are still loading or we haven't fetched them yet, wait
        // to avoid a race condition where the route redirects before the
        // products list is populated on first load or after a refetch.
        if (productsLoading || !productsFetched) {
            console.debug('ProtectedRouteProduct - esperando fetch de productos (loading:', productsLoading, ', fetched:', productsFetched, ')');
            return null;
        }

        if (!productId) {
            console.log('ProtectedRoute - Falta ID de producto en params, redirigiendo a /products');
            return <Navigate to="/products" replace />;
        }

        if (!productExists(productId)) {
            console.log('ProtectedRoute - Producto no encontrado en store para id:', productId, 'redirigiendo a /products');
            return <Navigate to="/products" replace />;
        }
    }

    return <>{children}</>;
}