
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCustomerById, getAppliancesByCustomerId } from "@/lib/service-data";
import { Customer, Appliance } from "@/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ApplianceList } from "@/components/dashboard/ApplianceList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, Pencil, PlusCircle } from "lucide-react";

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [appliances, setAppliances] = useState<Appliance[]>([]);

  useEffect(() => {
    if (id) {
      const customerData = getCustomerById(id);
      if (customerData) {
        setCustomer(customerData);
        const customerAppliances = getAppliancesByCustomerId(id);
        setAppliances(customerAppliances);
      }
    }
  }, [id]);

  if (!customer) {
    return (
      <div className="text-center py-10">
        <p>Customer not found</p>
        <Button asChild className="mt-4">
          <Link to="/customers">Back to Customers</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Link>
        </Button>

        <DashboardHeader
          title={customer.name}
          description="Customer details and appliances"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <span className="text-sm">{customer.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Customer Appliances</h2>
        <div className="space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/customers/${id}/edit`}>
              <Pencil className="h-4 w-4 mr-1" />
              Edit Customer
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link to={`/customers/${id}/appliances/new`}>
              <PlusCircle className="h-4 w-4 mr-1" />
              Add Appliance
            </Link>
          </Button>
        </div>
      </div>

      <ApplianceList appliances={appliances} />
    </div>
  );
};

export default CustomerDetail;
