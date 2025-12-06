export async function authService (formData: {email: string, password: string}) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4000';
    try {
        const response = await fetch(`${url}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error en el login');
        }

        return response.json();
    }
    catch (err) {
        throw err;
    }
}

export async function checkSession() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4000';
    try {
        const response = await fetch(`${url}/api/check-session`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
        })

        const data = await response.json();
        
        return data;

    }
    catch (err) {
        console.error('Error al verificar la sesión:', err);
    }
}