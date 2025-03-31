
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ApplianceList } from "@/components/dashboard/ApplianceList";
import { getAppliances, getCustomers } from "@/lib/service-data";
import { useState, useEffect } from "react";
import { Appliance, Customer, ApplianceType } from "@/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Appliances = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [filteredAppliances, setFilteredAppliances] = useState<Appliance[]>([]);

  const applianceTypes: ApplianceType[] = [
    "Refrigerator",
    "Washing Machine",
    "Dryer",
    "Dishwasher",
    "Oven",
    "Microwave",
    "Air Conditioner",
    "Water Heater",
    "Other",
  ];

  useEffect(() => {
    const allAppliances = getAppliances();
    const allCustomers = getCustomers();
    setAppliances(allAppliances);
    setFilteredAppliances(allAppliances);
    setCustomers(allCustomers);
  }, []);

  useEffect(() => {
    let filtered = [...appliances];
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (appliance) =>
          appliance.model.toLowerCase().includes(query) ||
          appliance.serialNumber.toLowerCase().includes(query) ||
          appliance.type.toLowerCase().includes(query)
      );
    }
    
    if (typeFilter && typeFilter !== "all") {
      filtered = filtered.filter(appliance => appliance.type === typeFilter);
    }
    
    setFilteredAppliances(filtered);
  }, [searchQuery, typeFilter, appliances]);

  return (
    <div>
      <DashboardHeader
        title="Appliances"
        description="Manage all appliances in your system"
        addButtonText="Add Appliance"
        addButtonLink="/appliances/new"
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appliances..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {applianceTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ApplianceList appliances={filteredAppliances} showCustomer customers={customers} />
    </div>
  );
};

export default Appliances;
