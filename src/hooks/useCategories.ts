import {useDispatch, useSelector} from "react-redux";
import { setCategories } from "@/redux/categories/sliceCategories";
import { useEffect } from "react";
import { getCategories } from "@/services/categoryService";
import type { RootState } from "@/redux/store";

export const useCategories = () => {
    const dispatch = useDispatch();
    const categoriesState = useSelector((state: RootState) => state.categories);

    useEffect(() => {
        const fetchCategories = async () => {
            // fetching categories
            try {
                const categories = await getCategories();
                // Normalize backend categories: ensure every category has `id` (string) and `name`.
                const normalized = (categories || []).map((c: any) => ({
                    id: c._id ? String(c._id) : String(c.id),
                    name: c.name,
                }));
                // categories normalized: dispatch to store
                dispatch(setCategories(normalized));
            } catch (error) {
                console.error('useCategories - Error fetching categories:', error);
            }
        }
        // Evitar llamadas duplicadas si ya tenemos categorias cargadas
        if (!categoriesState.categories || categoriesState.categories.length === 0) {
            fetchCategories();
        }
    }, [dispatch]);

    return {
        categoriesState
    }
}