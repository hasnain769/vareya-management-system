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

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [currentItems, setCurrentItems] = useState<PaymentType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 50;

      useEffect(() => {
        console.log("first")
        const fetchPayments = async () => {
          setLoading(true);
          setError(null);
          try {
            const paymentsData = await getAllPaymentsData();
            if (paymentsData && Array.isArray(paymentsData)) {
              setPayments(paymentsData);
              setPageCount(Math.ceil(paymentsData.length / itemsPerPage));
            } else {
              console.log("Unexpected data format:", paymentsData);
              setError("Unexpected data format received from the server.");
            }
          } catch (error) {
            console.error("Failed to fetch payments data:", error);
            setError("Failed to load payments data.");
          } finally {
            setLoading(false);
          }
        };

        fetchPayments();     
      }, []);

//   useEffect(() => {
//     const endOffset = itemOffset + itemsPerPage;
//     setCurrentItems(payments.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(payments.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage, payments]);

  const handlePageClick = (event : any ) => {
    const newOffset = (event.selected * itemsPerPage) % payments.length;
    setItemOffset(newOffset);
  };

  const totalPayments = calculateTotalAmounts(payments);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (payments.length === 0) return <div>No payments data available.</div>;

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
