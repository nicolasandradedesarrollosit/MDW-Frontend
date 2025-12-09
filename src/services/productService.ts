export async function getProducts(): Promise<any[] | null> {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    const response = await fetch(`${url}/api/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    // If the response is 304 not modified, we return null (to signal no change)
    if (response.status === 304) return null;
    if (!response.ok) return [];

    const data = await response.json();
    return data;
}

export async function createProd(productData: {name: string, description: string, price: number, url_image?: string, id_category: string}){
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    try {
    const response = await fetch(`${url}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productData)
    });
    const data = await response.json();
    if (!response.ok) {
        console.error('Failed to create product', data);
        const err: any = new Error(data?.message || 'Failed to create product');
        if (data?.details) err.details = data.details;
        throw err;
    }
    return data;
    }
    catch (err) {
        console.error('Error creating product:', err);
    }
}

export async function deleteProduct(id: string) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    try {
        const response = await fetch(`${url}/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
            ,credentials: 'include'
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('Failed to delete product', data);
            const err: any = new Error(data?.message || 'Failed to delete product');
            if (data?.details) err.details = data.details;
            throw err;
        }
        return data;
    }
    catch (err) {
        console.error('Error deleting product:', err);
    }   
}