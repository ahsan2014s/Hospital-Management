import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const FinancialsContent = ({ dashboardData }) => {
  // Helper function to determine trend icon and styling
  const getTrendInfo = (change) => {
    const isPositive = change >= 0;
    return {
      icon: isPositive ? TrendingUp : TrendingDown,
      textColor: isPositive ? 'text-green-600' : 'text-red-600',
      iconColor: isPositive ? 'text-green-600' : 'text-red-600',
      prefix: isPositive ? '+' : ''
    };
  };

  // Safely get financial data with fallbacks
  const financialData = dashboardData?.financialSummary || {};
  const monthlyRevenue = financialData.monthlyRevenue ?? 0;
  const monthlyExpenses = financialData.monthlyExpenses ?? 0;
  const netProfit = financialData.netProfit ?? 0;
  const revenueChange = financialData.revenueChange ?? 0;
  const expensesChange = financialData.expensesChange ?? 0;
  const profitChange = financialData.profitChange ?? 0;

  const revenueInfo = getTrendInfo(revenueChange);
  const expensesInfo = getTrendInfo(expensesChange);
  const profitInfo = getTrendInfo(profitChange);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Management</h2>
        
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900">Monthly Revenue</h3>
                <p className="text-2xl font-bold text-green-700">
                  ${monthlyRevenue.toLocaleString()}
                </p>
                <p className={`text-sm ${revenueInfo.textColor}`}>
                  {revenueInfo.prefix}{revenueChange}% from last month
                </p>
              </div>
              <revenueInfo.icon className={`w-8 h-8 ${revenueInfo.iconColor}`} />
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-900">Monthly Expenses</h3>
                <p className="text-2xl font-bold text-red-700">
                  ${monthlyExpenses.toLocaleString()}
                </p>
                <p className={`text-sm ${expensesInfo.textColor}`}>
                  {expensesInfo.prefix}{expensesChange}% from last month
                </p>
              </div>
              <expensesInfo.icon className={`w-8 h-8 ${expensesInfo.iconColor}`} />
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Net Profit</h3>
                <p className="text-2xl font-bold text-blue-700">
                  ${netProfit.toLocaleString()}
                </p>
                <p className={`text-sm ${profitInfo.textColor}`}>
                  {profitInfo.prefix}{profitChange}% from last month
                </p>
              </div>
              <profitInfo.icon className={`w-8 h-8 ${profitInfo.iconColor}`} />
            </div>
          </div>
        </div>

        {/* Department Revenue */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Revenue</h3>
          <div className="space-y-4">
            {dashboardData?.departmentStats?.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h4 className="font-medium text-gray-900">{dept.name}</h4>
                  <p className="text-sm text-gray-600">
                    {dept.currentPatients} patients • {Math.round((dept.currentPatients / dept.capacity) * 100)}% occupancy
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">${dept.monthlyRevenue?.toLocaleString() || '0'}</p>
                  <p className="text-xs text-gray-500">monthly revenue</p>
                </div>
              </div>
            )) || (
              <div className="text-center py-4 text-gray-500">
                No department data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialsContent;