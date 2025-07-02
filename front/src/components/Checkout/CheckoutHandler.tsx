'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cartStore';
import { ButtonSecondary } from '@/components/UI/Buttons/Buttons';
import api from '@/lib/axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import { routes } from '@/app/routes';
import toast from 'react-hot-toast';

interface CheckoutHandlerProps {
  onSuccess: () => void;
}

export const CheckoutHandler = ({ onSuccess }: CheckoutHandlerProps) => {
    const { items } = useCartStore();
    const { user } = useAuthStore();
    const router = useRouter();
    const paymentMethod = useCartStore((state) => state.paymentMethod);

    const handleCheckout = async () => {
        if (!user) {
            alert('Iniciá sesión para continuar');
            return setTimeout(() => {
                router.push(routes.public.login);
            }, 3000);
        }

        if (items.length === 0) return;

        const invalidItem = items.find(
            (item) => !item.sizeId || !/^[0-9a-fA-F-]{36}$/.test(item.sizeId)
        );
        if (invalidItem) {
            alert('Uno de los productos no tiene un talle seleccionado.');
            return;
        };
        
        const orderItems = items.map((item) => ({
            // 👇 Hacemos explícito que este es el variant_product_id
            variant_id: item.idVariant, // 👈 este es el campo uuid de la tabla tw_variant_product
            quantity: item.quantity,
            size_id: item.sizeId,
        }));
        
        
        const payload = {
            email: user.email,
            employee_id: user.userId,
            payment_method: paymentMethod,
            products: orderItems,
        };
        
        console.log('Items del carrito:', items);
        console.log('OrderItems transformados:', orderItems);
        console.log('Payload a enviar:', payload);

        try {
            const { data } = await api.post('/orders', payload, {
                withCredentials: true,
            });

            if (paymentMethod === 'Tarjeta') { // Asumiendo que así se llama el método para tarjetas
                if (data.url) {
                    toast.success('Redirigiendo para completar el pago...');
                    onSuccess(); // Limpia el carrito y cierra el dropdown
                    window.location.href = data.url;
                } else {
                    // El backend no devolvió la URL esperada para Mercado Pago
                    toast.error('Hubo un problema al generar el link de pago.');
                }
            } else if (paymentMethod === 'Efectivo') {
                // Para efectivo, no necesitamos nada de `data`. El éxito de la llamada es suficiente.
                toast.success('¡Compra registrada con éxito!');
                onSuccess(); // Limpia el carrito y cierra el dropdown
                // Redirigimos a la página que sugeriste.
                router.push(routes.shop.categories); 
            }

        } catch (err: any) {
            console.error('Error en el checkout:', err);
            toast.error('Error al procesar la orden. Inténtalo más tarde');
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