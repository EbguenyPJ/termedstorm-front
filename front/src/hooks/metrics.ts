const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/dashboard';

export const fetchSalesByEmployee = async (startDate: string, endDate: string) => {
    const res = await fetch(`${API_URL}/sales-by-employee?startDate=${startDate}&endDate=${endDate}`, {
        credentials: 'include',
    });
    return res.json();
};

export const fetchMonthlySales = async (year: number) => {
    const res = await fetch(`${API_URL}/monthly-sales?year=${year}`, {
        credentials: 'include',
    });
    return res.json();
};

export const fetchFinancialSummary = async (startDate: string, endDate: string) => {
    const res = await fetch(`${API_URL}/financial-summary?startDate=${startDate}&endDate=${endDate}`, {
        credentials: 'include',
    });
    return res.json();
};