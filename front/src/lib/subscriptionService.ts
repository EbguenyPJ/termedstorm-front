import { baseAxios } from '@/lib/authBase';

interface CheckoutPayload {
    email: string;
    first_name: string;
    last_name: string;
    price_id: string;
}

export async function createCheckoutSession(payload: CheckoutPayload) {
    const res = await baseAxios.post('/subscriptions/checkout-session', payload, {
        withCredentials: true,
    });

    return res.data.url;
};