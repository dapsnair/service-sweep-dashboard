
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplianceById, getCustomerById, formatDate } from "@/lib/service-data";
import { Appliance, Customer } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Pencil, Wrench } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Badge } from "@/components/ui/badge";

const ApplianceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [appliance, setAppliance] = useState<Appliance | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (id) {
      const applianceData = getApplianceById(id);
      if (applianceData) {
        setAppliance(applianceData);
        const customerData = getCustomerById(applianceData.customerId);
        if (customerData) {
          setCustomer(customerData);
        }
      }
    }
  }, [id]);

  if (!appliance || !customer) {
    return (
      <div className="text-center py-10">
        <p>Appliance not found</p>
        <Button asChild className="mt-4">
          <Link to="/appliances">Back to Appliances</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/appliances">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Appliances
        </Link>
      </Button>

      <DashboardHeader
        title={`${appliance.type}: ${appliance.model}`}
        description="Appliance details and service history"
      />

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Appliance Information</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline">{appliance.type}</Badge>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model:</span>
                <span>{appliance.model}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Serial Number:</span>
                <span className="font-mono">{appliance.serialNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Date:</span>
                <span>{formatDate(appliance.purchaseDate)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Interval:</span>
                <span>{appliance.serviceIntervalMonths} months</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Service:</span>
                <span>
                  {appliance.lastServiceDate 
                    ? formatDate(appliance.lastServiceDate) 
                    : "No service record"}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Service Due:</span>
                <span className="font-semibold">{formatDate(appliance.nextServiceDate)}</span>
              </div>
            </div>
            
            {appliance.notes && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground">{appliance.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4">Customer Information</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <Link 
                  to={`/customers/${customer.id}`} 
                  className="font-medium text-primary hover:underline"
                >
                  {customer.name}
                </Link>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{customer.email}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{customer.phone}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address:</span>
                <span className="text-right">{customer.address}</span>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/appliances/${appliance.id}/edit`}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Appliance
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to={`/service/${appliance.id}`}>
                  <Wrench className="h-4 w-4 mr-1" />
                  Record Service
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service History would go here in a real application */}
    </div>
  );
};

export default ApplianceDetail;
