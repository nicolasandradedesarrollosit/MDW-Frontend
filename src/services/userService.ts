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

export async function registerService(formData: { name: string, lastName: string, email: string, age: number, password: string}) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4000';
    try {
        console.log('Registrando usuario con datos:', formData);
        const response = await fetch(`${url}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const error = await response.json();
            console.error('Error del servidor:', error);
            throw new Error(error.message || 'Error en el registro');
        }

        const data = await response.json();
        console.log('Registro exitoso, data:', data);
        return data;
    }
    catch (err) {
        console.error('Error en registerService:', err);
        throw err;
    }
}