export async function getProductSizes() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    const response = await fetch(`${url}/api/product-sizes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    // 304 not modified -> signal no change
    if (response.status === 304) return null as any;
    if (!response.ok) return [];

    const data = await response.json();
    return data;
}

export async function createProductSize(productSizeData: {id_product: string, size: string, stock: number}){
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    try {
        const response = await fetch(`${url}/api/product-sizes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(productSizeData)
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('Failed to create product size', data);
            const err: any = new Error(data?.message || 'Failed to create product size');
            if (data?.details) err.details = data.details;
            throw err;
        }
        return data;
    }
    catch (err) {
        console.error('Error creating product size:', err);
        throw err;
    }
}

export async function deleteProductSize(id: string) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    try {
        const response = await fetch(`${url}/api/product-sizes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('Failed to delete product size', data);
            const err: any = new Error(data?.message || 'Failed to delete product size');
            if (data?.details) err.details = data.details;
            throw err;
        }
        return data;
    }
    catch (err) {
        console.error('Error deleting product size:', err);
        throw err;
    }
}