export async function getCategories() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    const response = await fetch(`${url}/api/categories`, {
        method: 'GET',
    });
    
    if (!response.ok) return [];

    const data = await response.json();
    return data;
}