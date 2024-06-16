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

      {/* Payment summaries and table code remains unchanged */}
    </div>
  );
}
