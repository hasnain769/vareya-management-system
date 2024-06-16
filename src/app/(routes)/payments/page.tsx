import { getAllPaymentsData } from "@/database/dbOperations";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { PaymentType } from "@/database/schema";

import Payments from '@/app/screens/Payments'
async function getPaymentsData() {
  console.log("first")
  const paymentsData = await getAllPaymentsData();
  
  console.log(paymentsData)
  return paymentsData as []
}

export default async function PaymentsPage() {
  const data = await getPaymentsData();
  console.log(data)
 
  return (
    <div className="w-full" >

      <Payments payments = {data}></Payments>
    </div>
  )

  }

