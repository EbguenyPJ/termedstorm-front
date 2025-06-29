// 'use client';

// import { useRouter } from 'next/navigation';
// import { useCartStore } from '@/stores/cartStore';
// import { ButtonSecondary } from '@/components/UI/Buttons/Buttons';
// import api from '@/lib/axiosInstance'
// import { useAuthStore } from '@/stores/authStore';

// export const CheckoutHandler = () => {
//     const { 
//         items, 
//         clearCart 
//     } = useCartStore();
//     const {
//         user, 
//          token 
//     } = useAuthStore();
//     const router = useRouter();

//     const handleCheckout = async () => {
//         if (!user) {
//             alert('Iniciá sesión para continuar');
//             setTimeout(() => {
//                 return router.push('/login');
//             }, 3000);
//         }

//         if (items.length === 0) {
//         alert('Tu carrito está vacío');
//         return;
//         }

//         const employeeId = 'UUID_EMPLEADO_FIXO'; // Este valor deberías cambiarlo pronto
//         const orderItems = items.map((item) => ({
//         variant_id: item.idVariant,
//         quantity: item.quantity,
//         size_id: item.sizeId,
//         }));

//         const payload = {
//         email: user?.email,
//         employee_id: employeeId,
//         payment_method: 'Tarjeta',
//         products: orderItems,
//         };

//         try {
//         const { data } = await api.post('/orders', payload, {
//             withCredentials: true,
//             headers: {
//             Authorization: `Bearer ${token}`,
//             },
//         });

//         if (data.url) {
//             window.location.href = data.url;
//         }
//         } catch (err: any) {
//         console.error('Error en el checkout:', err);
//         alert('Error al iniciar el pago. Intentalo más tarde');
//         }
//     };

//     return (
//         <ButtonSecondary
//         onClick={handleCheckout}
//         className="mt-3 w-full bg-primary text-white py-2 rounded hover:bg-primary-600 text-sm"
//         textContent="Finalizar compra"
//         />
//     );
// };


'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { ButtonSecondary } from '@/components/UI/Buttons/Buttons';
import api from '@/lib/axiosInstance';
import { useAuthStore } from '@/stores/authStore';

export const CheckoutHandler = () => {
    const { items, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const router = useRouter();

    const handleCheckout = async () => {
        if (!user) {
            alert('Iniciá sesión para continuar');
        return setTimeout(() => {
                router.push('/login');
            }, 3000);
        }

        if (items.length === 0) {
            return;
        }

        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('auth-token='))
            ?.split('=')[1];

        if (!token) {
            alert('Token de autenticación no encontrado.');
            return;
        }

        const orderItems = items.map((item) => ({
            variant_id: item.idVariant,
            quantity: item.quantity,
            size_id: item.sizeId,
        }));

        const payload = {
            email: user.email,
            employee_id: user.userId,
            payment_method: 'Tarjeta',
            products: orderItems,
        };

        try {
        const { data } = await api.post('/orders', payload, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (data.url) {
            clearCart();
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