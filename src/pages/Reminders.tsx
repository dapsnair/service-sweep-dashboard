
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ServiceReminderCard } from "@/components/dashboard/ServiceReminderCard";
import { getUpcomingServiceReminders } from "@/lib/service-data";
import { useState, useEffect } from "react";
import { ServiceReminder } from "@/types";
import { Bell } from "lucide-react";

const Reminders = () => {
  const [reminders, setReminders] = useState<ServiceReminder[]>([]);

  useEffect(() => {
    const upcomingReminders = getUpcomingServiceReminders();
    setReminders(upcomingReminders);
  }, []);

  return (
    <div>
      <DashboardHeader
        title="Service Reminders"
        description="Upcoming service reminders for the next week"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <ServiceReminderCard key={reminder.id} reminder={reminder} />
          ))
        ) : (
          <div className="col-span-full bg-card rounded-lg p-6 text-center">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No upcoming services</h3>
            <p className="text-muted-foreground">
              There are no service reminders due in the next week.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;
