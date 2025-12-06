export async function getProducts() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4000';
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