
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ServiceReminderCard } from "@/components/dashboard/ServiceReminderCard";
import { getUpcomingServiceReminders, getCustomers, getAppliances } from "@/lib/service-data";
import { Users, Box, Bell, CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";
import { ServiceReminder } from "@/types";

const Dashboard = () => {
  const [reminders, setReminders] = useState<ServiceReminder[]>([]);

  useEffect(() => {
    // Fetch service reminders
    const upcomingReminders = getUpcomingServiceReminders();
    setReminders(upcomingReminders);
  }, []);

  const customers = getCustomers();
  const appliances = getAppliances();
  const totalCustomers = customers.length;
  const totalAppliances = appliances.length;
  const overdueServices = 0; // In a real app, we would calculate this
  const upcomingServices = reminders.length;

  return (
    <div>
      <DashboardHeader
        title="Dashboard"
        description="Overview of your service management system"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Customers"
          value={totalCustomers}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Total Appliances"
          value={totalAppliances}
          icon={Box}
          color="green"
        />
        <StatsCard
          title="Upcoming Services"
          value={upcomingServices}
          icon={CalendarClock}
          color="yellow"
        />
        <StatsCard
          title="Overdue Services"
          value={overdueServices}
          icon={Bell}
          color="red"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Upcoming Service Reminders</h2>
      
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

export default Dashboard;
