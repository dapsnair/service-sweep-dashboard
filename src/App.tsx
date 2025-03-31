
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Customers from "./pages/Customers";
import CustomerDetail from "./pages/CustomerDetail";
import CustomerForm from "./pages/CustomerForm";
import Appliances from "./pages/Appliances";
import ApplianceDetail from "./pages/ApplianceDetail";
import ApplianceForm from "./pages/ApplianceForm";
import Reminders from "./pages/Reminders";
import RecordService from "./pages/RecordService";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Customer Routes */}
          <Route 
            path="/customers" 
            element={
              <Layout>
                <Customers />
              </Layout>
            } 
          />
          <Route 
            path="/customers/new" 
            element={
              <Layout>
                <CustomerForm />
              </Layout>
            } 
          />
          <Route 
            path="/customers/:id" 
            element={
              <Layout>
                <CustomerDetail />
              </Layout>
            } 
          />
          <Route 
            path="/customers/:id/edit" 
            element={
              <Layout>
                <CustomerForm />
              </Layout>
            } 
          />
          <Route 
            path="/customers/:customerId/appliances/new" 
            element={
              <Layout>
                <ApplianceForm />
              </Layout>
            } 
          />
          
          {/* Appliance Routes */}
          <Route 
            path="/appliances" 
            element={
              <Layout>
                <Appliances />
              </Layout>
            } 
          />
          <Route 
            path="/appliances/new" 
            element={
              <Layout>
                <ApplianceForm />
              </Layout>
            } 
          />
          <Route 
            path="/appliances/:id" 
            element={
              <Layout>
                <ApplianceDetail />
              </Layout>
            } 
          />
          <Route 
            path="/appliances/:id/edit" 
            element={
              <Layout>
                <ApplianceForm />
              </Layout>
            } 
          />
          
          {/* Service Routes */}
          <Route 
            path="/reminders" 
            element={
              <Layout>
                <Reminders />
              </Layout>
            } 
          />
          <Route 
            path="/service/:id" 
            element={
              <Layout>
                <RecordService />
              </Layout>
            } 
          />
          
          {/* Settings */}
          <Route 
            path="/settings" 
            element={
              <Layout>
                <Settings />
              </Layout>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
