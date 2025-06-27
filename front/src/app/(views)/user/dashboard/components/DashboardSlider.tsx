'use client';

import React from 'react';

export default function DashboardSlider() {
    return (
        <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max">
                <div className="min-w-[300px] max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                {/* Gráfico 1 - por ejemplo, ventas semanales */}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ventas semanales</h2>
                    <div id="sales-chart" className="h-60" />
                </div>

                <div className="min-w-[300px] max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                    {/* Gráfico 2 - leads generados */}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Leads generados</h2>
                    <div id="leads-chart" className="h-60" />
                </div>

                <div className="min-w-[300px] max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                    {/* Gráfico 3 - tráfico web */}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tráfico web</h2>
                    <div id="traffic-chart" className="h-60" />
                </div>
            </div>
        </div>
    );
};