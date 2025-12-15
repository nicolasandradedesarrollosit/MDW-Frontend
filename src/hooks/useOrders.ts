import {useDispatch, useSelector} from "react-redux";
import { setLoading } from "@/redux/orders/sliceOrders";
import { useEffect } from "react";
import { fetchOrders } from "@/services/cartService";
import type { RootState } from "@/redux/store";

export const useOrders = () => {
    const dispatch = useDispatch();
    const orderState = useSelector((state: RootState) => state.order);

    useEffect(() => {
        const getOrders = async () => {
            console.log('useOrders - Fetching orders1...');
            try {
                dispatch(setLoading(true));
                const response = await fetchOrders();
                if (!response) {
                    console.debug('useOrders - No response from fetchOrders');
                    dispatch(setLoading(false));
                    return;
                }

                if (!response.ok) {
                    console.error('useOrders - fetchOrders returned error', response.data);
                    const { setError } = await import('@/redux/orders/sliceOrders');
                    dispatch(setError(response.data?.message || 'Error fetching orders'));
                    dispatch(setLoading(false));
                    return;
                }

                const ordersData = response.data || [];
                const { setOrders } = await import('@/redux/orders/sliceOrders');
                dispatch(setOrders(ordersData));
                dispatch(setLoading(false));
            } catch (error) {
                console.error('useOrders - Error fetching orders:', error);
                dispatch(setLoading(false));
            }
        };
        getOrders();
    }, [dispatch]);

    return {
        orderState
    }
}