export async function getProducts(): Promise<any[] | null> {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    const response = await fetch(`${url}/api/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    if (response.status === 304) return null;
    if (!response.ok) return [];

    const data = await response.json();
    return data;
}

export async function createProd(productData: {name: string, description: string, price: number, url_image?: string, id_category: string}){
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    try {
    const fullUrl = `${url}/api/products`;
    console.debug('createProd - POST', fullUrl, 'body:', productData);
    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productData)
    });
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
            console.error('Failed to create product', data);
            const err: any = new Error(data?.message || 'Failed to create product');
            if (data?.details) err.details = data.details;
            throw err;
        }
        return data;
    } else {
        const text = await response.text();
        console.error('createProd - Non-JSON response', response.status, response.statusText, text);
        const err: any = new Error(`Failed to create product: ${response.status} ${response.statusText}`);
        err.body = text;
        throw err;
    }
    }
    catch (err) {
        console.error('Error creating product:', err);
    }
}

export async function deleteProduct(id: string) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    try {
        const fullUrl = `${url}/api/products/${encodeURIComponent(id)}`;
        console.debug('deleteProduct - DELETE', fullUrl);
        const response = await fetch(fullUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
            ,credentials: 'include'
        });
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const data = await response.json();
            if (!response.ok) {
                console.error('Failed to delete product', data);
                const err: any = new Error(data?.message || 'Failed to delete product');
                if (data?.details) err.details = data.details;
                throw err;
            }
            return data;
        } else {
            const text = await response.text();
            console.error('deleteProduct - Non-JSON response', response.status, response.statusText, text);
            const err: any = new Error(`Failed to delete product: ${response.status} ${response.statusText}`);
            err.body = text;
            throw err;
        }
    }
    catch (err) {
        console.error('Error deleting product:', err);
    }   
}

export async function updateProduct(id: string | undefined | null, productData: {name?: string, description?: string, price?: number, url_image?: string, id_category?: string}){
    if (!id) throw new Error('Product id is required');
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    const encodedId = encodeURIComponent(id as string);
    const fullUrl = `${url}/api/products/${encodedId}`;
    try {
        console.debug('updateProduct - PATCH', fullUrl, 'body:', productData);
        const response = await fetch(fullUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(productData)
        });

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const data = await response.json();
            if (!response.ok) {
                console.error('Failed to update product', response.status, response.statusText, data);
                const err: any = new Error(data?.message || `Failed to update product: ${response.status} ${response.statusText}`);
                if (data?.details) err.details = data.details;
                throw err;
            }
            return data;
        }
        else {
            // Non-JSON response (HTML or plain text) - read text for debugging
            const text = await response.text();
            console.error('updateProduct - Non-JSON response', response.status, response.statusText, text);
            const err: any = new Error(`Failed to update product: ${response.status} ${response.statusText}`);
            err.body = text;
            throw err;
        }
    }
    catch (err) {
        console.error('Error updating product (network/parse):', err);
        throw err;
    }
}