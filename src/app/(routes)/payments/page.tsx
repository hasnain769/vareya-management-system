"use client"
import { getAllPaymentsData } from "@/database/dbOperations";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { PaymentType } from "@/database/schema";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";


export const dynamic = 'force-dynamic'
function calculateTotalAmounts(transactions: PaymentType[]) {
  let totalAuthorizedAmount = 0;
  let totalRefundedAmount = 0;
  let totalPostauthAmount = 0;

 
  transactions.forEach(transaction => {
    // Ensure that nullable fields are treated as strings or 0 if they are null or undefined
    totalAuthorizedAmount += parseFloat(transaction.authorized_amount || '0');
    totalRefundedAmount += parseFloat(transaction.refunded_amount || '0');
    totalPostauthAmount += parseFloat(transaction.postauthed_amount || '0');
  });

  return {
    totalAuthorizedAmount,
    totalRefundedAmount,
    totalPostauthAmount
  };
}

export default function Component() {
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 50;
  const [currentItems, setCurrentItems] = useState<PaymentType[]>([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const getPayments = async () => {
      const paymentsData = await getAllPaymentsData();
      setPayments(paymentsData);
    };
    getPayments();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(payments.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(payments.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, payments]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % payments.length;
    setItemOffset(newOffset);
  };

  const totalPayments = calculateTotalAmounts(payments);

  return (
    <div className="overflow-hidden rounded-lg border-gray-200 dark:border-gray-800 px-3 border-s-violet-100 border-4">
      <h1 className="text-3xl font-extrabold p-5">Payments Summaries</h1>
      <div className="grid md:grid-cols-3 gap-4 p-2">
        <Card className="bg-green-300">
          <CardHeader>
            <CardTitle>Total Authorized Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalPayments.totalAuthorizedAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-300">
          <CardHeader>
            <CardTitle>Total Post Authorized Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalPayments.totalPostauthAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-red-300">
          <CardHeader>
            <CardTitle>Total Refunded Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${totalPayments.totalRefundedAmount.toFixed(2)}</div>
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
            {currentItems.map((payment: PaymentType) => (
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