
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplianceById, getCustomerById, recordService } from "@/lib/service-data";
import { Appliance, Customer } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const RecordService = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [appliance, setAppliance] = useState<Appliance | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [serviceDate, setServiceDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !appliance) {
      toast({
        title: "Error",
        description: "Appliance not found.",
        variant: "destructive",
      });
      return;
    }

    try {
      recordService(id, serviceDate.toISOString());
      toast({
        title: "Success",
        description: "Service record has been saved.",
      });
      navigate(`/appliances/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record service.",
        variant: "destructive",
      });
    }
  };

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
        <Link to={`/appliances/${id}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Appliance Details
        </Link>
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Record Service</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{customer.name}</span>
              <Badge variant="outline">{appliance.type}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {appliance.model} ({appliance.serialNumber})
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="serviceDate">Service Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {serviceDate ? format(serviceDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={serviceDate}
                    onSelect={(date) => date && setServiceDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Service Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any notes about the service"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/appliances/${id}`)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Service
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecordService;
