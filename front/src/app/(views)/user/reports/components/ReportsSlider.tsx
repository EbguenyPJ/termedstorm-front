'use client';

import React from 'react';
import SalesChart from './charts/SalesChart';
import IncomeVsExpenseChart from './charts/IncomeVsExpenseChart';
import EmployeeComparisonChart from './charts/EmployeeComparisonChart';

export default function ReportsSlider() {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        <SalesChart />
        <IncomeVsExpenseChart />
        <EmployeeComparisonChart />
      </div>
    </div>
  );
}
