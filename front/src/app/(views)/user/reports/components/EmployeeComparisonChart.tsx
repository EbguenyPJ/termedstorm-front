// 'use client';

// import React from 'react';
// import Chart from 'react-apexcharts';
// import ChartCard from '../components/ChartCard';
// import { ApexOptions } from 'apexcharts';

// export default function EmployeeComparisonChart() {
//     const options: ApexOptions = {
//         chart: { type: 'donut' },
//         labels: ['Ana', 'Carlos', 'Juan', 'Luisa'],
//         colors: ['#6366f1', '#ec4899', '#f59e0b', '#10b981'],
//     };

//     const series = [25, 35, 20, 20];

//     return (
//         <ChartCard title="Ventas por Empleado">
//             <Chart options={options} series={series} type="donut" height="100%" />
//         </ChartCard>
//     );
// };


'use client';

import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ChartCard from '../components/ChartCard';
import { ApexOptions } from 'apexcharts';
import { fetchSalesByEmployee } from '@/hooks/metrics';

export default function EmployeeComparisonChart() {
    const [labels, setLabels] = useState<string[]>([]);
    const [series, setSeries] = useState<number[]>([]);

    useEffect(() => {
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);

        const format = (d: Date) => d.toISOString().split('T')[0];

        fetchSalesByEmployee(format(weekAgo), format(today)).then(data => {
            setLabels(data.map((emp: any) => `${emp.firstName}`));
            setSeries(data.map((emp: any) => emp.totalSales));
        });
    }, []);

    const options: ApexOptions = {
        chart: { type: 'donut' },
        labels,
        colors: ['#6366f1', '#ec4899', '#f59e0b', '#10b981'],
    };

    return (
        <ChartCard title="Ventas por Empleado">
            <Chart options={options} series={series} type="donut" height="100%" />
        </ChartCard>
    );
};