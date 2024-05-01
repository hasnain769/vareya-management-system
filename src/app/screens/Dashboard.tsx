"use client";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// import { useStore } from "@/store";
import { OrderType } from "@/database/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getOrders } from "@/database/dbOperations";



export default function Dashboard() {
  const router  = useRouter()
  const [orders ,setorders] = useState<OrderType[]>([])

  console.log("dashboard loaded")




  useEffect(() => {
    // const fetchOrdersFromStore = useStore((state) => state.fetchOrders);
    // const fetchedOrders = useStore((state) => state.orders);
    
    const fetchOrders = async () => {
      
      const result = (await getOrders()).reverse()
      const data = result
      setorders(data as any)
      

    };

     fetchOrders();
  }, []);
  function handleDetailshow(item:OrderType){
        router.push(`/order?id=${item.id as number}`)
        return

  }
 
  return (

    <>
      

    
        <div className="bg-white dark:bg-gray-900">
        <div className="flex flex-col">
          
          <div className="flex items-center justify-between px-6 py-2">
            <div className="flex space-x-2">
              <ListIcon className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium">{orders.length} items- Updated a few seconds ago</span>
            </div>
            
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                <TableHead>S.No</TableHead>
                  <TableHead>Order Summary Number</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ordered Date</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {
                
                orders.map((item : OrderType ,i)=>(
                  <TableRow className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={()=>handleDetailshow(item)} key={i}>

                  <TableCell className="font-medium">{i+1}</TableCell>
                  <TableCell className="font-medium">{item.order_number}</TableCell>
                  <TableCell>{item.shop_name}</TableCell>
                  <TableCell>{item.fulfillment_status}</TableCell>
                  <TableCell>{item.order_date?.toLocaleString()}</TableCell>
                  <TableCell>{item.total_price}</TableCell>

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
