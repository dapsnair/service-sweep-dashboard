
import { ServiceReminder } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/service-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info, Wrench } from "lucide-react";

interface ServiceReminderCardProps {
  reminder: ServiceReminder;
}

export function ServiceReminderCard({ reminder }: ServiceReminderCardProps) {
  const dueDate = formatDate(reminder.dueDate);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{reminder.customer.name}</CardTitle>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Due {dueDate}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{reminder.appliance.type}</span>
            <span className="text-muted-foreground">{reminder.appliance.model}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>Serial: {reminder.appliance.serialNumber}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/customers/${reminder.customerId}`}>
                <Info className="h-4 w-4 mr-1" /> Details
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to={`/service/${reminder.applianceId}`}>
                <Wrench className="h-4 w-4 mr-1" /> Record Service
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
