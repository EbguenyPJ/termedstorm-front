'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { ButtonSecondary } from '@/components/UI/Buttons/Buttons';
import api from '@/lib/axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import { routes } from '@/app/routes';
import toast from 'react-hot-toast';

export const CheckoutHandler = () => {
    const { items, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const router = useRouter();

    const handleCheckout = async () => {
        if (!user) {
            alert('Iniciá sesión para continuar');
            return setTimeout(() => {
                router.push(routes.public.login);
            }, 3000);
        }

        if (items.length === 0) {
            return;
        }

        const invalidItem = items.find(
            (item) => !item.sizeId || !/^[0-9a-fA-F-]{36}$/.test(item.sizeId)
        );
        if (invalidItem) {
            alert('Uno de los productos no tiene un talle seleccionado.');
            return;
        };
        
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
        
        console.log('Items del carrito:', items);
        console.log('OrderItems transformados:', orderItems);
        console.log('Payload a enviar:', payload);

        try {
            const { data } = await api.post('/orders', payload, {
                withCredentials: true,
            });

            if (data.url) {
                clearCart();
                window.location.href = data.url;
            }
        } catch (err: any) {
            console.error('Error en el checkout:', err);
            toast.error('Error al iniciar el pago. Intentalo más tarde')
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