import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Order {
    userId: string | null;
    products: any[];
    totalAmount: number;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
}

export interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

export const initialState: OrderState = {
    orders: [],
    loading: false,
    error: null,
}

const productSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.loading = false;
        },
        updateOrder: (state, action: PayloadAction<Order>) => {
            const index = state.orders.findIndex(order => order.userId === action.payload.userId);
            if (index !== -1) {
                state.orders[index] = action.payload;
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
})

export const { setOrders, setLoading, setError, updateOrder } = productSlice.actions;
export default productSlice.reducer;

export const selectOrders = (state: { orders: OrderState }) => state.orders.orders;
export const selectOrdersLoading = (state: { orders: OrderState }) => state.orders.loading;