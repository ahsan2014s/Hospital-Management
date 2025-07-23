import React from 'react';
import { Mail, Phone, Clock } from 'lucide-react';

const ContactInfo = ({ email, phone, shift }) => {
  const contactItems = [
    { icon: Mail, label: email, value: email },
    { icon: Phone, label: phone, value: phone },
    { icon: Clock, label: shift, value: shift }
  ];

  return (
    <div className="space-y-4">
      {contactItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div key={index} className="flex items-center space-x-3">
            <IconComponent className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">{item.value}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ContactInfo;