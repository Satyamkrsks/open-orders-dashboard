"use client";

import { useState } from "react";
import OrdersTable from "@/components/dashboard/OrdersTable";
import SearchBar from "@/components/dashboard/SearchBar";
import FilterChips from "@/components/dashboard/FilterChips";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { orderData } from "@/lib/data/orders";
import ClientSelector from "@/components/dashboard/ClientSelector";

export default function Dashboard() {
  const [selectedClient, setSelectedClient] = useState("AAA002");
  const [activeFilters, setActiveFilters] = useState<string[]>(["RELIANCE", "ASIANPAINT"]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter orders based on selected client and active filters
  const filteredOrders = orderData.filter(order => {
    const matchesClient = !selectedClient || order.client === selectedClient;
    const matchesFilter = activeFilters.length === 0 || 
      activeFilters.includes(order.ticker);
    return matchesClient && matchesFilter;
  });

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log("Downloading orders data...");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Open Orders</h1>
        <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mb-4">
          <ClientSelector 
            selectedClient={selectedClient} 
            onSelectClient={setSelectedClient} 
          />
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search for a stock, future, option or index" 
          />
        </div>
        
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilters.map(filter => (
              <FilterChips 
                key={filter} 
                label={filter} 
                onRemove={() => removeFilter(filter)} 
              />
            ))}
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={clearAllFilters}
              className="ml-auto"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel all
            </Button>
          </div>
        )}
        
        <OrdersTable orders={filteredOrders} />
      </div>
    </div>
  );
}