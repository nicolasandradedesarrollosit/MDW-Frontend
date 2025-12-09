import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Category {
    id: string;
    name: string;
}

export interface CategoriesState {
    categories: Category[];
    loading: boolean;
}

export const initialState: CategoriesState = {
    categories: [],
    loading: false
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
            state.loading = false;
        }
    }
})

export const {setCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;

export const selectCategories = (state: { categories: CategoriesState }) => state.categories.categories;
export const selectCategoriesLoading = (state: { categories: CategoriesState }) => state.categories.loading;