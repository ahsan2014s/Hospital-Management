import React from 'react';
import { DollarSign, Users, UserPlus, Bed, Activity, Calendar, Stethoscope, FileText } from 'lucide-react';
import StatsCards from './dashboard/StatsCard';
import DepartmentPerformance from './dashboard/DepartmentPerformance';
import RecentActivities from './dashboard/RecentActivities';
import QuickActions from './dashboard/QuickActions';

const DashboardContent = ({ dashboardData }) => {
  return (
    <div className="space-y-6">
      <StatsCards statsCards={dashboardData.statsCards} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentPerformance departmentStats={dashboardData.departmentStats} />
        <RecentActivities recentActivities={dashboardData.recentActivities} />
      </div>

      <QuickActions />
    </div>
  );
};

export default DashboardContent;