export async function getProducts() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4001';
    const response = await fetch(`${url}/api/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

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
        body: JSON.stringify(productData)
    });

    if (!response.ok) return console.error('Failed to create product');
    const data = await response.json();
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
        });
        if (!response.ok) return console.error('Failed to delete product');
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error('Error deleting product:', err);
    }   
}