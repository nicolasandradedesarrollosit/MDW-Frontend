import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Product {
    _id: string;
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
    fetched: boolean; // whether we've already loaded products
}

export const initialState: ProductsState = {
    products: [],
    loading: false
    ,fetched: false
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.loading = false;
        },
        setFetched: (state, action: PayloadAction<boolean>) => {
            state.fetched = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const { setProduct, setLoading, setFetched } = productSlice.actions;
export default productSlice.reducer;

export const selectProducts = (state: { products: ProductsState }) => state.products.products;
export const selectProductsLoading = (state: { products: ProductsState }) => state.products.loading;