
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  getApplianceById, 
  addAppliance, 
  updateAppliance, 
  getCustomers,
  getApplianceTypes
} from "@/lib/service-data";
import { ApplianceType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const ApplianceForm = () => {
  const { id, customerId } = useParams<{ id?: string; customerId?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { toast } = useToast();

  const applianceTypes = getApplianceTypes();
  const customers = getCustomers();

  const [formData, setFormData] = useState({
    customerId: customerId || '',
    type: 'Refrigerator' as ApplianceType,
    model: '',
    serialNumber: '',
    purchaseDate: new Date().toISOString(),
    lastServiceDate: null as string | null,
    serviceIntervalMonths: 12,
    notes: '',
  });

  // Format dates for the calendar component
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());
  const [lastServiceDate, setLastServiceDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (isEditMode && id) {
      const appliance = getApplianceById(id);
      if (appliance) {
        setFormData({
          customerId: appliance.customerId,
          type: appliance.type,
          model: appliance.model,
          serialNumber: appliance.serialNumber,
          purchaseDate: appliance.purchaseDate,
          lastServiceDate: appliance.lastServiceDate,
          serviceIntervalMonths: appliance.serviceIntervalMonths,
          notes: appliance.notes,
        });
        setPurchaseDate(new Date(appliance.purchaseDate));
        if (appliance.lastServiceDate) {
          setLastServiceDate(new Date(appliance.lastServiceDate));
        }
      } else {
        navigate('/appliances');
      }
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePurchaseDateChange = (date: Date | undefined) => {
    if (date) {
      setPurchaseDate(date);
      setFormData((prev) => ({ ...prev, purchaseDate: date.toISOString() }));
    }
  };

  const handleLastServiceDateChange = (date: Date | undefined) => {
    setLastServiceDate(date);
    setFormData((prev) => ({ 
      ...prev, 
      lastServiceDate: date ? date.toISOString() : null 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerId || !formData.type || !formData.model || !formData.serialNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isEditMode && id) {
        const appliance = getApplianceById(id);
        if (appliance) {
          updateAppliance({ ...appliance, ...formData });
          toast({
            title: "Success",
            description: "Appliance updated successfully.",
          });
        }
      } else {
        addAppliance(formData);
        toast({
          title: "Success",
          description: "New appliance added successfully.",
        });
      }
      navigate(formData.customerId ? `/customers/${formData.customerId}` : '/appliances');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save appliance data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Button variant="ghost" asChild className="mb-4">
        <Link to={customerId ? `/customers/${customerId}` : "/appliances"}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {customerId ? 'Back to Customer' : 'Back to Appliances'}
        </Link>
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Appliance' : 'Add New Appliance'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.customerId} 
                onValueChange={(value) => handleSelectChange('customerId', value)}
                disabled={Boolean(customerId)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Appliance Type <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select appliance type" />
                </SelectTrigger>
                <SelectContent>
                  {applianceTypes.map(({ type }) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Model <span className="text-red-500">*</span></Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Appliance Model"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number <span className="text-red-500">*</span></Label>
              <Input
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Serial Number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {purchaseDate ? format(purchaseDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={purchaseDate}
                    onSelect={handlePurchaseDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastServiceDate">Last Service Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lastServiceDate ? format(lastServiceDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={lastServiceDate}
                    onSelect={handleLastServiceDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceIntervalMonths">Service Interval (Months)</Label>
              <Input
                id="serviceIntervalMonths"
                name="serviceIntervalMonths"
                type="number"
                min={1}
                max={60}
                value={formData.serviceIntervalMonths}
                onChange={handleChange}
                placeholder="Service Interval in Months"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional information about this appliance"
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(customerId ? `/customers/${customerId}` : '/appliances')}
              >
                Cancel
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Appliance
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplianceForm;
