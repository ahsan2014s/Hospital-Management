import { 
  BarChart3, 
  Users, 
  UserPlus, 
  Calendar, 
  Bed, 
  Package, 
  DollarSign, 
  FileText, 
  Settings, 
  Stethoscope,
  Heart
} from 'lucide-react';

export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope },
  { id: 'nurses', label: 'Nurses', icon: Heart },
  { id: 'staff', label: 'Staff Registration', icon: UserPlus },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'rooms', label: 'Room Management', icon: Bed },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'financials', label: 'Financials', icon: DollarSign },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings }
];