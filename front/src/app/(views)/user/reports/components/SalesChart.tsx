'use client';

import React from 'react';
import Chart from 'react-apexcharts';
import ChartCard from '../components/ChartCard';
import { ApexOptions } from 'apexcharts';

export default function SalesChart() {
    const options: ApexOptions = {
        chart: { type: 'area', toolbar: { show: false } },
        xaxis: { categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        colors: ['#3b82f6'],
    };

    const series = [
        {
            name: 'Ventas totales',
            data: [1200, 1800, 1300, 2100, 1900, 2500, 2700],
        },
    ];

    return (
        <ChartCard title="Ventas Totales">
            <Chart options={options} series={series} type="area" height="100%" />
        </ChartCard>
    );
};