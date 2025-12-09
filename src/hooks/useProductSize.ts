import { useDispatch, useSelector } from "react-redux";
import { setProductSizes, setFetched, setLoaded } from "@/redux/productSize/sliceProductSize";
import { useEffect, useRef } from "react";
import { getProductSizes } from "@/services/productSizeService";
import type { RootState } from "@/redux/store";

export const useProductSize = () => {
    const dispatch = useDispatch();
    const productSizesState = useSelector((state: RootState) => state.productSize);
    const isFetchingRef = useRef(false);

    useEffect(() => {
        const fetchProductSizes = async () => {
            if (isFetchingRef.current) return;
            isFetchingRef.current = true;
            console.log('useProductSize - Fetching product sizes...');
            try {
                const productSizes = await getProductSizes();
                if (productSizes === null) {
                    // 304 Not Modified from server
                    console.debug('useProductSize - Server returned 304 Not Modified');
                    dispatch(setFetched(true));
                    dispatch(setLoaded(true));
                } else {
                    dispatch(setProductSizes(productSizes));
                }
            }
            catch(err) {
                console.error('useProductSize - Error fetching product sizes:', err);
                // Ensure we mark as loaded to prevent infinite retry loop
                dispatch(setProductSizes([]));
            }
            finally {
                isFetchingRef.current = false;
            }
        };
        // Avoid requesting repeatedly: only fetch if we haven't already fetched sizes
        if (!productSizesState.fetched && !productSizesState.loaded) {
            fetchProductSizes();
        }
    }, [dispatch, productSizesState.fetched, productSizesState.loaded]);

    return {
        productSizesState
    };
}