export async function authService (formData: {email: string, password: string}) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
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
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
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
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
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

export async function getUsers() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    try {
        const response = await fetch(`${url}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
        });
        
        const data = await response.json();
        
        return data;
    }
    catch(err) {
        console.error('Error en getUsers:', err);
        throw err;
    }
}

import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

export async function logOut() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    try {
        // 1) Ask server to clear session cookies
        await fetch(`${url}/api/logout`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
        });
    }
    catch (err) {
        console.error('Error al cerrar sesión en el servidor:', err);
        // don't rethrow so we can still try client sign-out
    }
    finally {
        // 2) Ensure client Firebase session is signed out as well
        try {
            await signOut(auth);
            console.log('Firebase client sign-out successful');
        }
        catch (firebaseErr) {
            console.warn('Firebase client sign-out failed:', firebaseErr);
        }
    }
}

export async function authGoogleService(googleData: { idToken?: string | null, email?: string | null, name?: string | null}) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    try {
        const response = await fetch(`${url}/api/login-google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(googleData)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || 'Error en login con Google');
        }

        return response.json();
    }
    catch (err) {
        console.error('Error in authGoogleService:', err);
        throw err;
    }
}