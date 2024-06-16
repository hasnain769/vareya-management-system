
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getAllPaymentsData } from "@/database/dbOperations";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { PaymentType } from "@/database/schema";
import Payments from '@/app/screens/payments'
async function getPaymentsData() {
  const paymentsData = await getAllPaymentsData();
  console.log(paymentsData)
  return paymentsData as []
}

export default async function PaymentsPage() {
  const data = await getPaymentsData();
  <Payments payments = {data}></Payments>

  }
