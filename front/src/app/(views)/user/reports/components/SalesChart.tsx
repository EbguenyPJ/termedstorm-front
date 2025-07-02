// 'use client';

// import React from 'react';
// import Chart from 'react-apexcharts';
// import ChartCard from '../components/ChartCard';
// import { ApexOptions } from 'apexcharts';

// export default function SalesChart() {
//     const options: ApexOptions = {
//         chart: { type: 'area', toolbar: { show: false } },
//         xaxis: { categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
//         dataLabels: { enabled: false },
//         stroke: { curve: 'smooth' },
//         colors: ['#3b82f6'],
//     };

//     const series = [
//         {
//             name: 'Ventas totales',
//             data: [1200, 1800, 1300, 2100, 1900, 2500, 2700],
//         },
//     ];

//     return (
//         <ChartCard title="Ventas Totales">
//             <Chart options={options} series={series} type="area" height="100%" />
//         </ChartCard>
//     );
// };


'use client';

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ChartCard from '../components/ChartCard';
import { ApexOptions } from 'apexcharts';
import { fetchMonthlySales } from '@/hooks/metrics';

const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export default function SalesChart() {
    const [categories, setCategories] = useState<string[]>([]);
    const [seriesData, setSeriesData] = useState<number[]>([]);

    useEffect(() => {
        const year = new Date().getFullYear();
        fetchMonthlySales(year).then(data => {
            const completeData = Array(12).fill(0);
            data.forEach((item: any) => {
                completeData[item.month - 1] = item.totalSales;
            });
            setCategories(monthLabels);
            setSeriesData(completeData);
        });
    }, []);

    const options: ApexOptions = {
        chart: { type: 'area', toolbar: { show: false } },
        xaxis: { categories },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        colors: ['#3b82f6'],
    };

    const series = [{ name: 'Ventas totales', data: seriesData }];

    return (
        <ChartCard title="Ventas Totales">
            <Chart options={options} series={series} type="area" height="100%" />
        </ChartCard>
    );
};