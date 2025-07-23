// config/sidebarConfig.js

import { 
  Home, 
  Users, 
  AlertTriangle, 
  FileText
} from 'lucide-react';

export const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'waiting-list', label: 'Patients Waiting List', icon: Users },
  { id: 'cdc-pandemics', label: 'CDC Pandemic Info', icon: AlertTriangle },
  { id: 'cdc-recommendations', label: 'CDC Recommendations', icon: FileText }
];