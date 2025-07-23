// config/healthMenuItems.js

import { Home, Calendar, Pill, CreditCard, ClipboardList, Search } from 'lucide-react';

export const sidebarItems = [
  { id: 'home', label: 'Dashboard', icon: Home },
  { id: 'current-meds', label: 'Current Medications', icon: Pill },
  { id: 'previous-meds', label: 'Previous Medications', icon: ClipboardList },
  { id: 'health-card', label: 'Health Card', icon: CreditCard },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'search-doctor', label: 'Search Doctor', icon: Search }
];