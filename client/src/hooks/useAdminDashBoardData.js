// hooks/useAdminDashBoardData.js

import { useState, useEffect } from 'react';
import ApiService from '../services/adminAPI';

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState({
    statsCards: [],
    recentActivities: [],
    departmentStats: [],
    financialSummary: {}
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [reportsData, setReportsData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          statsResponse, 
          activitiesResponse, 
          departmentsResponse, 
          patientsResponse,
          doctorsResponse,
          nursesResponse,
          appointmentsResponse,
          inventoryResponse,
          roomsResponse,
          reportsResponse,
          financialsResponse
        ] = await Promise.all([
          ApiService.getDashboardStats(),
          ApiService.getRecentActivities(),
          ApiService.getDepartments(),
          ApiService.getPatients(),
          ApiService.getDoctors(),
          ApiService.getNurses(),
          ApiService.getAppointments(),
          ApiService.getInventory(),
          ApiService.getRoomData(),
          ApiService.getReportsData(),
          ApiService.getFinancialData()
        ]);
        
        setDashboardData({
          statsCards: statsResponse.data || [],
          recentActivities: activitiesResponse.data || [],
          departmentStats: departmentsResponse.data || [],
          financialSummary: financialsResponse.data?.summary || {}
        });
        setPatients(patientsResponse.data || []);
        setDoctors(doctorsResponse.data || []);
        setNurses(nursesResponse.data || []);
        setAppointments(appointmentsResponse.data || []);
        setInventory(inventoryResponse.data || []);
        setRoomData(roomsResponse.data || []);
        setReportsData(reportsResponse.data || {});
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setDashboardData({
          statsCards: [],
          recentActivities: [],
          departmentStats: [],
          financialSummary: {}
        });
        setPatients([]);
        setDoctors([]);
        setNurses([]);
        setAppointments([]);
        setInventory([]);
        setRoomData([]);
        setReportsData({});
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    dashboardData,
    patients,
    doctors,
    nurses,
    appointments,
    inventory,
    roomData,
    reportsData,
    loading
  };
};