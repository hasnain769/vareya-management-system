"use client";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllPaymentsData } from "@/database/dbOperations";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { PaymentType } from "@/database/schema";

function calculateTotalAmounts(transactions: PaymentType[]) {
  let totalAuthorizedAmount = 0, totalRefundedAmount = 0, totalPostauthAmount = 0;

  transactions.forEach(transaction => {
    totalAuthorizedAmount += parseFloat(transaction.authorized_amount || '0');
    totalRefundedAmount += parseFloat(transaction.refunded_amount || '0');
    totalPostauthAmount += parseFloat(transaction.postauthed_amount || '0');
  });

  return { totalAuthorizedAmount, totalRefundedAmount, totalPostauthAmount };
}

export default function PaymentsPage(props : any) {
    const {payments} = props
    console.log(payments)
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 50
    const [currentItems , setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [index , setIndex] = useState<number>(0)
    
  
    useEffect(()=>{
      const endOffSet = itemOffset + itemsPerPage
      setCurrentItems(payments.slice(itemOffset,endOffSet));
      setPageCount(Math.ceil(payments.length / itemsPerPage));
  
    },[itemOffset,itemsPerPage ,payments])
  

    const handlePageClick = (event : any) => {
        const newOffset = (event.selected * itemsPerPage) % payments.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
        if(newOffset != 0){
    
          setIndex(newOffset-50)
        }
      };

  const totalPayments = calculateTotalAmounts(payments);


  return (

   <div>
    <div className="overflow-hidden rounded-lg  border-gray-200 dark:border-gray-800 px-3 border-s-violet-100 border-4">
      <h1 className="  text-3xl font-extrabold p-5" >Payments summeries</h1>
      <div className="grid md:grid-cols-3 gap-4 p-2">
        <Card className="bg-green-300">
          <CardHeader>
            <CardTitle>Total Authorized Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalPayments.totalAuthorizedAmount}</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-300">
          <CardHeader>
            <CardTitle>Total Post Authorized Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalPayments.totalPostauthAmount.toFixed(2)}</div>
          </CardContent>
        </Card >
        <Card className="bg-red-300">
          <CardHeader>
            <CardTitle>Total Refunded Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalPayments.totalRefundedAmount}</div>
          </CardContent>
        </Card>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Authorized Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Post Authorized Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Refunded Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {/* Map over payments array and render a row for each payment */}
            {currentItems.map((payment : PaymentType) => (
              <tr key={payment.transaction_id}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">{payment.id}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">${payment.authorized_amount}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">${payment.postauthed_amount}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">${payment.refunded_amount}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{payment.card_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

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
   </div>

   
  );
}
