
export type ApplianceType = 
  | 'Refrigerator'
  | 'Washing Machine'
  | 'Dryer'
  | 'Dishwasher'
  | 'Oven'
  | 'Microwave'
  | 'Air Conditioner'
  | 'Water Heater'
  | 'Other';

export interface Appliance {
  id: string;
  customerId: string;
  type: ApplianceType;
  model: string;
  serialNumber: string;
  purchaseDate: string; // ISO date string
  lastServiceDate: string | null; // ISO date string
  serviceIntervalMonths: number;
  nextServiceDate: string; // ISO date string
  notes: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string; // ISO date string
}

export interface ServiceReminder {
  id: string;
  applianceId: string;
  customerId: string;
  dueDate: string; // ISO date string
  status: 'pending' | 'completed' | 'cancelled';
  appliance: Appliance;
  customer: Customer;
}
