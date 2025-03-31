
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  description: string;
  addButtonText?: string;
  addButtonLink?: string;
}

export function DashboardHeader({
  title,
  description,
  addButtonText,
  addButtonLink,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-800 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {addButtonText && addButtonLink && (
        <Button asChild className="ml-auto">
          <Link to={addButtonLink}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {addButtonText}
          </Link>
        </Button>
      )}
    </div>
  );
}
