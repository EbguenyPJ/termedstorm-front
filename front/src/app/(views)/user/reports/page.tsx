
'use client';

import React, { useEffect } from 'react';
import ReportsSlider from './components/ReportsSlider';
import { useAuthStore } from '@/stores/authStore';
//import { useRouter } from 'next/navigation';

export default function ReportsPage() {
    //const router = useRouter();
    const { user, fetchUser, isInitialized, setInitialized, loading, hasRole } = useAuthStore();

    useEffect(() => {
        const init = async () => {
            if (!isInitialized) {
                await fetchUser(); // intenta obtener el usuario desde el backend
                setInitialized(true);
            }
        };
        init();
    }, [isInitialized, fetchUser, setInitialized]);

    if (loading || !isInitialized) {
        return <p className="p-6 text-gray-600">Cargando información...</p>;
    }

    if (!user || !hasRole('admin')) {
        return <p className="text-red-500 p-6">Acceso restringido. Debes ser administrador.</p>;
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>
            <ReportsSlider />
        </main>
    );
};