
import { Appliance, ApplianceType, Customer, ServiceReminder } from "@/types";
import { addMonths, format, isAfter, isBefore, parseISO, startOfDay, endOfDay, addDays } from "date-fns";

// Default service intervals in months for different appliance types
const defaultServiceIntervals: Record<ApplianceType, number> = {
  'Refrigerator': 12,
  'Washing Machine': 12,
  'Dryer': 12,
  'Dishwasher': 12,
  'Oven': 12,
  'Microwave': 24,
  'Air Conditioner': 6,
  'Water Heater': 12,
  'Other': 12,
};

// Mock data
let customers: Customer[] = [
  {
    id: "c1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown, CA 90210",
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "c2",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "555-987-6543",
    address: "456 Oak Ave, Springfield, CA 90211",
    createdAt: "2023-02-20T00:00:00Z",
  },
  {
    id: "c3",
    name: "Michael Williams",
    email: "michael.williams@example.com",
    phone: "555-567-8901",
    address: "789 Pine St, Riverdale, CA 90212",
    createdAt: "2023-03-25T00:00:00Z",
  },
];

let appliances: Appliance[] = [
  {
    id: "a1",
    customerId: "c1",
    type: "Refrigerator",
    model: "FreshCool X500",
    serialNumber: "FC500-123456",
    purchaseDate: "2023-01-20T00:00:00Z",
    lastServiceDate: null,
    serviceIntervalMonths: 12,
    nextServiceDate: "2024-01-20T00:00:00Z",
    notes: "Premium model with ice maker",
  },
  {
    id: "a2",
    customerId: "c1",
    type: "Washing Machine",
    model: "CleanWash 3000",
    serialNumber: "CW3000-789012",
    purchaseDate: "2023-01-25T00:00:00Z",
    lastServiceDate: null,
    serviceIntervalMonths: 12,
    nextServiceDate: "2024-01-25T00:00:00Z",
    notes: "Front-loading, energy efficient",
  },
  {
    id: "a3",
    customerId: "c2",
    type: "Dishwasher",
    model: "SparkleWash Elite",
    serialNumber: "SWE-345678",
    purchaseDate: "2023-02-22T00:00:00Z",
    lastServiceDate: null,
    serviceIntervalMonths: 12,
    nextServiceDate: "2024-02-22T00:00:00Z",
    notes: "Ultra quiet model",
  },
  {
    id: "a4",
    customerId: "c3",
    type: "Air Conditioner",
    model: "CoolBreeze 5000",
    serialNumber: "CB5000-901234",
    purchaseDate: "2023-03-30T00:00:00Z",
    lastServiceDate: null,
    serviceIntervalMonths: 6,
    nextServiceDate: "2023-09-30T00:00:00Z",
    notes: "Split system for living room",
  },
  {
    id: "a5",
    customerId: "c3",
    type: "Oven",
    model: "ChefPro Double Oven",
    serialNumber: "CP-DO-567890",
    purchaseDate: "2023-03-30T00:00:00Z",
    lastServiceDate: null,
    serviceIntervalMonths: 12,
    nextServiceDate: "2024-03-30T00:00:00Z",
    notes: "Double oven with convection",
  },
];

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Calculate next service date based on the last service date or purchase date
const calculateNextServiceDate = (appliance: Appliance): string => {
  const baseDate = appliance.lastServiceDate ? appliance.lastServiceDate : appliance.purchaseDate;
  return addMonths(new Date(baseDate), appliance.serviceIntervalMonths).toISOString();
};

// Get all customers
export const getCustomers = (): Customer[] => {
  return [...customers];
};

// Get customer by ID
export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find(customer => customer.id === id);
};

// Add a new customer
export const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>): Customer => {
  const newCustomer: Customer = {
    id: generateId(),
    ...customer,
    createdAt: new Date().toISOString(),
  };
  customers.push(newCustomer);
  return newCustomer;
};

// Update customer
export const updateCustomer = (updatedCustomer: Customer): Customer => {
  customers = customers.map(customer => 
    customer.id === updatedCustomer.id ? updatedCustomer : customer
  );
  return updatedCustomer;
};

// Delete customer
export const deleteCustomer = (id: string): boolean => {
  const initialLength = customers.length;
  customers = customers.filter(customer => customer.id !== id);
  // Also delete all appliances for this customer
  appliances = appliances.filter(appliance => appliance.customerId !== id);
  return customers.length < initialLength;
};

// Get all appliances
export const getAppliances = (): Appliance[] => {
  return [...appliances];
};

// Get appliances by customer ID
export const getAppliancesByCustomerId = (customerId: string): Appliance[] => {
  return appliances.filter(appliance => appliance.customerId === customerId);
};

// Get appliance by ID
export const getApplianceById = (id: string): Appliance | undefined => {
  return appliances.find(appliance => appliance.id === id);
};

// Add a new appliance
export const addAppliance = (
  appliance: Omit<Appliance, 'id' | 'nextServiceDate'>
): Appliance => {
  const serviceIntervalMonths = appliance.serviceIntervalMonths || 
    defaultServiceIntervals[appliance.type];
  
  const newAppliance: Appliance = {
    id: generateId(),
    ...appliance,
    serviceIntervalMonths,
    nextServiceDate: calculateNextServiceDate({
      ...appliance,
      id: '',
      serviceIntervalMonths,
      nextServiceDate: ''
    }),
  };
  
  appliances.push(newAppliance);
  return newAppliance;
};

// Update appliance
export const updateAppliance = (updatedAppliance: Appliance): Appliance => {
  // Recalculate next service date if necessary
  const recalculatedAppliance = {
    ...updatedAppliance,
    nextServiceDate: calculateNextServiceDate(updatedAppliance),
  };
  
  appliances = appliances.map(appliance => 
    appliance.id === recalculatedAppliance.id ? recalculatedAppliance : appliance
  );
  
  return recalculatedAppliance;
};

// Delete appliance
export const deleteAppliance = (id: string): boolean => {
  const initialLength = appliances.length;
  appliances = appliances.filter(appliance => appliance.id !== id);
  return appliances.length < initialLength;
};

// Record a service for an appliance
export const recordService = (applianceId: string, serviceDate: string): Appliance | undefined => {
  const appliance = getApplianceById(applianceId);
  if (!appliance) return undefined;
  
  const updatedAppliance: Appliance = {
    ...appliance,
    lastServiceDate: serviceDate,
    nextServiceDate: addMonths(new Date(serviceDate), appliance.serviceIntervalMonths).toISOString(),
  };
  
  return updateAppliance(updatedAppliance);
};

// Get all service reminders for upcoming week
export const getUpcomingServiceReminders = (): ServiceReminder[] => {
  const today = startOfDay(new Date());
  const nextWeek = endOfDay(addDays(today, 7));
  
  return appliances
    .filter(appliance => {
      const nextServiceDate = parseISO(appliance.nextServiceDate);
      return isAfter(nextServiceDate, today) && isBefore(nextServiceDate, nextWeek);
    })
    .map(appliance => {
      const customer = getCustomerById(appliance.customerId);
      if (!customer) throw new Error(`Customer not found for appliance ${appliance.id}`);
      
      return {
        id: generateId(),
        applianceId: appliance.id,
        customerId: appliance.customerId,
        dueDate: appliance.nextServiceDate,
        status: 'pending',
        appliance,
        customer,
      };
    });
};

// Get appliance types and their default service intervals
export const getApplianceTypes = (): { type: ApplianceType; defaultInterval: number }[] => {
  return Object.entries(defaultServiceIntervals).map(([type, interval]) => ({
    type: type as ApplianceType,
    defaultInterval: interval
  }));
};

// Format date for display
export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'PP');
};
