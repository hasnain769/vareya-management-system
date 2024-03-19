"use client";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import OrderDetailsPage from "./orderDetails";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { OrderType } from "@/utils/types";

export default function Dashboard() {
  console.log("dashboard loaded")
  const[orders , setorders]=useState<OrderType[]>([])
  const orderss = useStore((state) => state.orders);
  const fetchOrders = useStore((state) => state.fetchOrders);

  useEffect(() => {
    const fetchOrders = async () => {
      await fetchOrders()
      try {
        const response  = await fetch('http://localhost:3000/api/ordersDetails');
      
        if (!response.ok) {
          console.log("error fetching orders")
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setorders(data);
      } catch (error) {
        console.log('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);
  const [detailsClick, setDetailsClick] = useState(false);
 
  return (

    <>
      <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex space-x-4">
              <MenuIcon className="text-gray-600 dark:text-gray-300" />
              <h1 className="text-xl font-semibold">Order Management</h1>
              <Select>
                <SelectTrigger id="order-summaries">
                  <SelectValue>Order Summaries</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="recently-viewed">Recently Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <SettingsIcon className="text-gray-600 dark:text-gray-300" />
              {/* <HelpCircleIcon className="text-gray-600 dark:text-gray-300" /> */}
              <SignalIcon className="text-gray-600 dark:text-gray-300" />
              <Avatar>
                <AvatarImage alt="User avatar" src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Toggle aria-label="Toggle night mode">
                <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Toggle>
            </div>
          </div>
      {detailsClick && <OrderDetailsPage />}
      {!detailsClick && (
        <div className="bg-white dark:bg-gray-900">
        <div className="flex flex-col">
          
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex space-x-2">
              <ListIcon className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium">49 items - Updated a few seconds ago</span>
            </div>
            <Input className="w-1/4" placeholder="Search..." type="search" />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Summary Number</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ordered Date</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {
                orders.map((item :OrderType)=>(

                <TableRow className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={()=>setDetailsClick(!detailsClick)}>
                  <TableCell className="font-medium">{item.order_number}</TableCell>
                  <TableCell>{item.shop_name}</TableCell>
                  <TableCell>{item.fulfillment_status}</TableCell>
                  <TableCell>{item.order_date}</TableCell>
                  <TableCell>$217.34</TableCell>
                </TableRow>
                ))
              }
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex space-x-4">
              {/* <HistoryIcon className="text-gray-600 dark:text-gray-300" /> */}
              <StickyNoteIcon className="text-gray-600 dark:text-gray-300" />
              <LogInIcon className="text-gray-600 dark:text-gray-300" />
              <InfoIcon className="text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Previous</Button>
              <Button>Next</Button>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}



function InfoIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function ListIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function LogInIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}


function MenuIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MoonIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function SettingsIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function SignalIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>
  )
}


function StickyNoteIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
      <path d="M15 3v6h6" />
    </svg>
  )
}
