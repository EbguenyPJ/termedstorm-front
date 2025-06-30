'use client';

import React from 'react';
import Chart from 'react-apexcharts';
import ChartCard from '../components/ChartCard';
import { ApexOptions } from 'apexcharts';

export default function IncomeVsExpenseChart() {
    const options: ApexOptions = {
        chart: { type: 'bar', toolbar: { show: false } },
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] },
        plotOptions: { bar: { horizontal: false, columnWidth: '55%' } },
        colors: ['#10b981', '#ef4444'],
    };

    const series = [
        {
            name: 'Ingresos',
            data: [5000, 6000, 7000, 8000, 7500],
        },
        {
            name: 'Egresos',
            data: [3000, 3500, 4000, 4200, 3900],
        },
    ];

    return (
        <ChartCard title="Ingresos vs Egresos">
            <Chart options={options} series={series} type="bar" height="100%" />
        </ChartCard>
    );
};