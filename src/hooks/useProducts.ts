import {useDispatch, useSelector} from "react-redux";
import { setProduct, setFetched, setLoading } from "@/redux/products/sliceProducts";
import { useEffect } from "react";
import { getProducts } from "@/services/productService";
import type { RootState } from "@/redux/store";

export const useProducts = () => {
    const dispatch = useDispatch();
    const productsState = useSelector((state: RootState) => state.products);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('useProducts - Fetching products...');
            try {
                dispatch(setLoading(true));
                const products = await getProducts();
                // If getProducts returned null for 304 not modified, mark as fetched and keep existing products
                if (products === null) {
                    console.debug('useProducts - Server returned 304 (Not modified), marking as fetched');
                    dispatch(setFetched(true));
                    dispatch(setLoading(false));
                    return;
                }
                dispatch(setProduct(products));
                dispatch(setFetched(true));
            } catch (error) {
                console.error('useProducts - Error fetching products:', error);
                dispatch(setLoading(false));
            }
        };
        // Evitar llamadas duplicadas si ya tenemos products fetch indicados
        if (!productsState.fetched && !productsState.loading) {
            fetchProducts();
        }
    }, [dispatch, productsState.fetched, productsState.loading]);

    return {
        productsState
    }
}