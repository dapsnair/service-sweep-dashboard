
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  color?: "default" | "blue" | "green" | "yellow" | "red";
  trend?: ReactNode;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  color = "default",
  trend,
}: StatsCardProps) {
  const colorClasses = {
    default: "bg-card",
    blue: "bg-blue-50 dark:bg-blue-950/30",
    green: "bg-green-50 dark:bg-green-950/30",
    yellow: "bg-yellow-50 dark:bg-yellow-950/30",
    red: "bg-red-50 dark:bg-red-950/30",
  };

  const iconColorClasses = {
    default: "text-muted-foreground",
    blue: "text-blue-600 dark:text-blue-400",
    green: "text-green-600 dark:text-green-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
    red: "text-red-600 dark:text-red-400",
  };

  return (
    <Card className={colorClasses[color]}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 ${iconColorClasses[color]}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between">
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && <div className="text-xs">{trend}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
