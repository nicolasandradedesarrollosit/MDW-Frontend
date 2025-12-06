import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Product {
    name: string;
    description: string;
    price: number;
    stock: number;
    url_image: string;
    id_category: string;
}

export interface ProductsState {
    products: Product[];
    loading: boolean;
}

export const initialState: ProductsState = {
    products: [],
    loading: false
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const { setProduct, setLoading } = productSlice.actions;
export default productSlice.reducer;

export const selectProducts = (state: { products: ProductsState }) => state.products.products;
export const selectProductsLoading = (state: { products: ProductsState }) => state.products.loading;