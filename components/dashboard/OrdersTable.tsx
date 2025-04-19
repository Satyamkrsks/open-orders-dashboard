"use client";

import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, SlidersHorizontal, MoreVertical, Volume2 } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderData } from "@/lib/data/orders";
import Pagination from "@/components/dashboard/Pagination";
import { cn } from "@/lib/utils";

interface OrdersTableProps {
  orders: OrderData[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [sortField, setSortField] = useState<keyof OrderData>("time");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Sort orders based on current sort field and direction
  const sortedOrders = [...orders].sort((a, b) => {
    // Handle numeric fields
    if (sortField === "price" || sortField === "quantity") {
      const aNum = parseFloat(aValue.toString().replace(/[^\d.-]/g, ''));
      const bNum = parseFloat(bValue.toString().replace(/[^\d.-]/g, ''));
      
      if (isNaN(aNum) || isNaN(bNum)) return 0;
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }

    // Handle string fields
    const aStr = aValue.toString().toLowerCase();
    const bStr = bValue.toString().toLowerCase();
    return sortDirection === "asc" 
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Handle sort
  const handleSort = (field: keyof OrderData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Render sort icon
  const renderSortIcon = (field: keyof OrderData) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="h-4 w-4 ml-1" />
    );
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer w-[120px]"
                onClick={() => handleSort("time")}
              >
                <div className="flex items-center">
                  Time {renderSortIcon("time")}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer w-[120px]"
                onClick={() => handleSort("client")}
              >
                <div className="flex items-center">
                  Client {renderSortIcon("client")}
                </div>
              </TableHead>
              <TableHead 
                className="w-[150px]"
              >
                Ticker
              </TableHead>
              <TableHead 
                className="w-[100px]"
              >
                <div className="flex items-center">
                  Side
                  <Button variant="ghost" size="icon" className="ml-1 h-5 w-5">
                    <SlidersHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer w-[150px]"
                onClick={() => handleSort("product")}
              >
                <div className="flex items-center">
                  Product {renderSortIcon("product")}
                  <Button variant="ghost" size="icon" className="ml-1 h-5 w-5">
                    <SlidersHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer text-right w-[150px]"
                onClick={() => handleSort("quantity")}
              >
                <div className="flex items-center justify-end">
                  Qty (Executed/Total) {renderSortIcon("quantity")}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer text-right w-[120px]"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center justify-end">
                  Price {renderSortIcon("price")}
                </div>
              </TableHead>
              <TableHead className="text-right w-[100px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={`${order.time}-${order.client}-${order.ticker}`}>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.client}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {order.ticker}
                    {order.hasAudio && (
                      <Volume2 className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span 
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      order.side === "Buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}
                  >
                    {order.side}
                  </span>
                </TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell className="text-right">{order.quantity}</TableCell>
                <TableCell className="text-right">{order.price}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Modify Order</DropdownMenuItem>
                      <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-end mt-4">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}