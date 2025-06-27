import React from 'react';
import DashboardSlider from './components/DashboardSlider';

export default function DashboardPage() {
    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h1>
            <DashboardSlider />
        </main>
    );
};