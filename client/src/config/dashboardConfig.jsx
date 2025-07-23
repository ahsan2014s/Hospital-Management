import { User, Stethoscope, Pill, Calendar, Clock, Phone, Mail } from 'lucide-react';

export const DASHBOARD_TABS = {
  OVERVIEW: 'overview',
  PATIENT: 'patient'
};

export const MENU_ITEMS = [
  {
    id: 'overview',
    label: 'Nurse Overview',
    icon: User,
    type: 'overview'
  }
];

export const CARD_COLORS = {
  ASSIGNED_PATIENTS: {
    background: 'bg-blue-50',
    text: 'text-blue-600',
    title: 'text-blue-800'
  },
  HIRE_DATE: {
    background: 'bg-green-50',
    text: 'text-green-600',
    title: 'text-green-800'
  },
  MEDICATIONS_DUE: {
    background: 'bg-orange-50',
    text: 'text-orange-600',
    title: 'text-orange-800'
  },
  ACTIVE_DOCTORS: {
    background: 'bg-purple-50',
    text: 'text-purple-600',
    title: 'text-purple-800'
  },
  DEPARTMENT: {
    background: 'bg-teal-50',
    text: 'text-teal-600',
    title: 'text-teal-800'
  },
  CONDITION: {
    background: 'bg-yellow-50',
    text: 'text-yellow-700',
    title: 'text-yellow-800'
  }
};

export const CONTACT_ICONS = {
  email: Mail,
  phone: Phone,
  shift: Clock
};

export const SECTION_ICONS = {
  doctors: Stethoscope,
  medications: Pill,
  calendar: Calendar
};