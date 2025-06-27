import React from 'react';
import ReportsSlider from './components/ReportsSlider';
import { cookies } from 'next/headers';
import jwtDecode from 'jwt-decode';

interface TokenPayload {
    role: string;
}

export default function DashboardPage() {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    let isAdmin = false;
    if (token) {
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            isAdmin = decoded.role === 'admin';
        } catch (err) {
            console.error('Error decoding token', err);
        }
    }

    if (!isAdmin) {
        return <p className="text-red-500 p-6">Acceso restringido. Debes ser administrador.</p>;
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>
            <ReportsSlider />
        </main>
    );
};