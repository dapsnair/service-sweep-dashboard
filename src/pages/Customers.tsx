
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CustomerList } from "@/components/dashboard/CustomerList";
import { getCustomers } from "@/lib/service-data";
import { useState, useEffect } from "react";
import { Customer } from "@/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const allCustomers = getCustomers();
    setCustomers(allCustomers);
    setFilteredCustomers(allCustomers);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.phone.includes(query) ||
          customer.address.toLowerCase().includes(query)
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  return (
    <div>
      <DashboardHeader
        title="Customers"
        description="Manage your customer database"
        addButtonText="Add Customer"
        addButtonLink="/customers/new"
      />

      <div className="flex items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <CustomerList customers={filteredCustomers} />
    </div>
  );
};

export default Customers;
