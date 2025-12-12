import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ProductSize {
    _id: string;
    id_product: string;
    size: string;
    stock: number;
    // Optional enriched fields (added by client when mapping to UI)
    name?: string;
    url_image?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductSizeState {
    sizes: ProductSize[];
    loaded: boolean;
    fetched: boolean;
}

export const initialProductSizeState: ProductSizeState = {
    sizes: [],
    loaded: false,
    fetched: false,
};

export const productSizeSlice = createSlice({
    name: "productSizes",
    initialState: initialProductSizeState,
    reducers: {
        setProductSizes(state, action: PayloadAction<ProductSize[]>) {
            state.sizes = action.payload;
            state.loaded = true;
            state.fetched = true;
        }
        ,setLoaded(state, action: PayloadAction<boolean>) {
            state.loaded = action.payload;
        }
        ,setFetched(state, action: PayloadAction<boolean>) {
            state.fetched = action.payload;
        }
    }
});

export const {setProductSizes, setLoaded, setFetched} = productSizeSlice.actions;
export default productSizeSlice.reducer;

export const selectProductSizes = (state: { productSize: ProductSizeState }) => state.productSize.sizes;
export const selectProductSizesLoaded = (state: { productSize: ProductSizeState }) => state.productSize.loaded;
export const selectProductSizesLoading = (state: { productSize: ProductSizeState }) => !state.productSize.loaded;