"use client"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Order, order } from "@/database/schema";
import Link from "next/link";
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";



interface DashboardProps {}

export default  function Dashboard(props : any) {

  const {orders} = props
  console.log(orders)
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 50
  const [currentItems , setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [index , setIndex] = useState<number>(0)
  

  useEffect(()=>{
    const endOffSet = itemOffset + itemsPerPage
    setCurrentItems(orders.slice(itemOffset,endOffSet));
    setPageCount(Math.ceil(orders.length / itemsPerPage));

  },[itemOffset,itemsPerPage ,orders])


  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = orders.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(orders.length / itemsPerPage);


  const handlePageClick = (event : any) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    if(newOffset != 0){

      setIndex(newOffset-50)
    }
  };


  if (orders.length === 0) {
    return (
      <div>
        <h1>No data</h1>
      </div>
    );
  }
  return (

      <>
     
        <div className="bg-white dark:bg-gray-900">
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-6 py-2">
              <div className="flex space-x-2">
              <ListIcon className="text-gray-600 dark:text-gray-300" />
              {/* <span className="text-sm font-medium">{order.length} items- Updated a few seconds ago</span> */}
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
           
                
                Array.isArray(currentItems) && currentItems.map((item : Order ,i )=>(
                  <TableRow key={item.id} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                  <TableCell className="font-medium">{index+i}</TableCell>
                  <TableCell className="font-medium text-blue-500 underline-offset-2"><Link href={"/orders/" + item.id}>{item.order_number}</Link></TableCell>
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
          <div className="pt-5">
            
            <>
      
            <ReactPaginate 
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
      />
    </>
            
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

// export default Dashboard;