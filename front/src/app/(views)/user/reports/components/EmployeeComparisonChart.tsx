'use client';

import React from 'react';
import Chart from 'react-apexcharts';
import ChartCard from '../components/ChartCard';
import { ApexOptions } from 'apexcharts';

export default function EmployeeComparisonChart() {
    const options: ApexOptions = {
        chart: { type: 'donut' },
        labels: ['Ana', 'Carlos', 'Juan', 'Luisa'],
        colors: ['#6366f1', '#ec4899', '#f59e0b', '#10b981'],
    };

    const series = [25, 35, 20, 20];

    return (
        <ChartCard title="Ventas por Empleado">
            <Chart options={options} series={series} type="donut" height="100%" />
        </ChartCard>
    );
};