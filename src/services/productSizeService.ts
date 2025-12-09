export async function getProductSizes() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    const response = await fetch(`${url}/api/product-sizes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
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
            body: JSON.stringify(productSizeData)
        });

        if (!response.ok) return console.error('Failed to create product size');
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Error creating product size:', err);
    }
}

export async function deleteProductSize(id: string) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    try {
        const response = await fetch(`${url}/api/product-sizes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) return console.error('Failed to delete product size');
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Error deleting product size:', err);
    }
}