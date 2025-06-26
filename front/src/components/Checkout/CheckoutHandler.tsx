'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { ButtonSecondary } from '@/components/UI/Buttons/Buttons';
import api from '@/lib/axiosInstance'
import { useAuthStore } from '@/stores/authStore';

export const CheckoutHandler = () => {
    const { 
        items, 
        //clearCart 
    } = useCartStore();
    const {
        user, 
         //token 
    } = useAuthStore(); // Debería asegurarme de tener el token aparentemente. CONSULTAR
    const router = useRouter();

    const handleCheckout = async () => {
        if (!user) {
            alert('Iniciá sesión para continuar');
            setTimeout(() => {
                return router.push('/login');
            }, 3000);
        }

        if (items.length === 0) {
        alert('Tu carrito está vacío');
        return;
        }

        const employeeId = 'UUID_EMPLEADO_FIXO'; // Este valor deberías cambiarlo pronto
        const orderItems = items.map((item) => ({
        variant_id: item.idVariant, // asegurate que esto exista en el store
        quantity: item.quantity,
        }));

        const payload = {
        email: user?.email,
        employee_id: employeeId,
        payment_method: 'Tarjeta',
        products: orderItems,
        };

        try {
        const { data } = await api.post('/api/orders', payload, {
            withCredentials: true,
            // headers: {
            // Authorization: `Bearer ${token}`, // solo si usás autenticación por header
            // },
        });

        if (data.url) {
            window.location.href = data.url;
        }
        } catch (err: any) {
        console.error('Error en el checkout:', err);
        alert('Error al iniciar el pago. Intentalo más tarde');
        }
    };

    return (
        <ButtonSecondary
        onClick={handleCheckout}
        className="mt-3 w-full bg-primary text-white py-2 rounded hover:bg-primary-600 text-sm"
        textContent="Finalizar compra"
        />
    );
};