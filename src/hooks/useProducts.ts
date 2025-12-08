import {useDispatch, useSelector} from "react-redux";
import { setProduct } from "@/redux/products/sliceProducts";
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
                const products = await getProducts();
                dispatch(setProduct(products));
            } catch (error) {
                console.error('useProducts - Error fetching products:', error);
            }
        };
        // Evitar llamadas duplicadas si ya tenemos productos cargados
        if (!productsState.products || productsState.products.length === 0) {
            fetchProducts();
        }
    }, [dispatch, productsState.products]);

    return {
        productsState
    }
}