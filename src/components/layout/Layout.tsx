
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Users, Settings, Box, Bell, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const routes = [
    {
      label: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      label: "Customers",
      href: "/customers",
      icon: Users,
    },
    {
      label: "Appliances",
      href: "/appliances",
      icon: Box,
    },
    {
      label: "Service Reminders",
      href: "/reminders",
      icon: Bell,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  // Only render the Sheet component on mobile, and the fixed Sidebar on desktop
  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background sticky top-0 z-30">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="mr-2">
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-60 p-0">
                  <ScrollArea className="h-full">
                    <div className="py-4">
                      <div className="px-3 py-2">
                        <h2 className="text-lg font-semibold tracking-tight">
                          Service Sweep
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Appliance Service Dashboard
                        </p>
                      </div>
                      <nav className="mt-6 px-2">
                        {routes.map((route) => (
                          <Link
                            key={route.href}
                            to={route.href}
                            onClick={() => setOpen(false)}
                          >
                            <Button
                              variant={isActive(route.href) ? "default" : "ghost"}
                              className={`w-full justify-start ${
                                isActive(route.href)
                                  ? "bg-primary text-primary-foreground"
                                  : ""
                              }`}
                            >
                              <route.icon className="mr-2 h-4 w-4" />
                              {route.label}
                            </Button>
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-bold">Service Sweep</span>
              </Link>
            </div>
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="mr-2">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 bg-muted/40">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="hidden lg:block border-r" collapsible="icon">
          <SidebarHeader className="flex items-center px-4 py-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold">Service Sweep</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(route.href)}
                    tooltip={route.label}
                  >
                    <Link to={route.href}>
                      <route.icon className="mr-2 h-4 w-4" />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="text-xs text-muted-foreground">
            <div className="hidden lg:flex lg:justify-end">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="border-b bg-background sticky top-0 z-30 lg:hidden">
            <div className="flex h-14 items-center px-4">
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-bold">Service Sweep</span>
              </Link>
              <div className="flex-1" />
              <Button variant="ghost" size="icon" className="mr-2">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 bg-muted/40">
            <div className="container py-6 max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
