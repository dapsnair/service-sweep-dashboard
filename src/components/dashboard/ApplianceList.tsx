
import { Appliance, Customer } from "@/types";
import { formatDate } from "@/lib/service-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info, Pencil, Wrench } from "lucide-react";

interface ApplianceListProps {
  appliances: Appliance[];
  showCustomer?: boolean;
  customers?: Customer[];
}

export function ApplianceList({ appliances, showCustomer = false, customers = [] }: ApplianceListProps) {
  const getCustomerName = (customerId: string): string => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {showCustomer && <TableHead>Customer</TableHead>}
            <TableHead>Type</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Next Service</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliances.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showCustomer ? 7 : 6} className="text-center text-muted-foreground py-4">
                No appliances found
              </TableCell>
            </TableRow>
          ) : (
            appliances.map(appliance => (
              <TableRow key={appliance.id}>
                {showCustomer && <TableCell>{getCustomerName(appliance.customerId)}</TableCell>}
                <TableCell>
                  <Badge variant="outline">{appliance.type}</Badge>
                </TableCell>
                <TableCell>{appliance.model}</TableCell>
                <TableCell className="font-mono text-sm">{appliance.serialNumber}</TableCell>
                <TableCell>{formatDate(appliance.purchaseDate)}</TableCell>
                <TableCell>{formatDate(appliance.nextServiceDate)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/appliances/${appliance.id}`}>
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Details</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/appliances/${appliance.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/service/${appliance.id}`}>
                        <Wrench className="h-4 w-4" />
                        <span className="sr-only">Service</span>
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
