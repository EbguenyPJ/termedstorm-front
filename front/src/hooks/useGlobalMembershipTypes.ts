import { useEffect, useState } from 'react';
import { baseAxios } from '@/lib/authBase';
import IMembershipType from '@/interfaces/membershipType';

export function useGlobalMembershipTypes() {
    const [types, setTypes] = useState<IMembershipType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGlobalMembershipTypes = async () => {
        try {
            const response = await baseAxios.get('/global-membership-types');
            setTypes(response.data);
        } catch (err) {
            console.error('Error al obtener tipos de membresía globales:', err);
            setError('No se pudieron cargar los tipos de membresía para empresas.');
        } finally {
            setLoading(false);
        }
        };

        fetchGlobalMembershipTypes();
    }, []);

    return { types, loading, error };
};