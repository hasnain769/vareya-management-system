import { getAllPaymentsData } from "@/database/dbOperations";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { PaymentType } from "@/database/schema";

import Payments from '@/app/screens/Payments'
async function getPaymentsData() {
  const paymentsData = await getAllPaymentsData();
  console.log(paymentsData)
  return paymentsData as []
}

export default async function PaymentsPage() {
  const data = await getPaymentsData();
  <Payments payments = {data}></Payments>

  }

