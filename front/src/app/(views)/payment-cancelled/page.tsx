'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { useAuthStore } from '@/app/stores/authStore';

export default function PaymentCancelledPage() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!user) {
        router.push('/login');
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-center space-y-6">
                <XCircle className="h-16 w-16 text-red-600 mx-auto" />
                <h1 className="text-3xl font-bold text-gray-800">Pago cancelado</h1>
                <p className="text-gray-600">Tu suscripción no se completó. Podés intentarlo nuevamente cuando quieras.</p>
                <button
                onClick={() => router.push('/client-subscription')}
                className="mt-4 bg-neutral-600 text-white px-6 py-2 rounded-2xl hover:bg-neutral-700 transition-all"
                >
                    Volver a planes
                </button>
            </div>
        </div>
    );
};