"use client"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, Select } from "@/components/ui/select"
import { Tabs } from "@/components/ui/tabs"
import Link from "next/link"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {  getLineItems, getPaymentSummery, getSingleOrder, getaddresses, orderstatus } from "@/database/dbOperations"
import { useEffect, useState } from "react"
import { AddressType, LineItemType, OrderType, ShipmentType ,PaymentType } from "@/database/schema"
// import { useStore } from "@/store"
import { useSearchParams , useRouter} from "next/navigation"
//import { useRouter } from 'next/router';
import PathComponent from "../screens/pathComponent"
import { StatusIndicator } from "@/components/ui/status-indicator"

export default  function OrderDetailsPage() {
  const [item ,setItem] = useState <OrderType> ()
  const [address, setAddress] = useState <AddressType[]>([])
  const[status , setstatus] = useState<ShipmentType []> ([])
  const [lineItems, setlineItem] = useState < any | null>(null)
  const [paymentSummery , setPaymentSummery] = useState<PaymentType> ()
  const searchParams = useSearchParams()
 
  const id = searchParams.get('id')
  console.log(id)
 



  useEffect(()=>{
    const fetchDetails =async ()=>{
      console.log(id)
      let addr : any =""
      let orderNumber : any = ""
      let Oid : any = ""
      let PaymentId : any= ""
      try{

        const result = await getSingleOrder(id)
        addr = result[0]?.shipping_address_id 
        PaymentId = result[0].payments_id

        orderNumber = result[0]?.order_number
        Oid = result[0]?.order_id
        console.log(Oid)
        setItem(result[0])
      }finally{

        console.log(orderNumber)
        const add = await getaddresses(addr)
        const paymentsDetails = await getPaymentSummery(PaymentId)
        const statusData = (await orderstatus(orderNumber)).reverse()
        setAddress(add)
        setPaymentSummery(paymentsDetails[0])
        setstatus(statusData)
        try {

          const response = await fetch(`https://vareya-management-system.vercel.app/api/single-order-details?id=${Oid}`)
          const lineItemsData =await response.json()
          console.log(lineItemsData)
          setlineItem(lineItemsData)
        } catch (error : unknown){
          console.log(error)
        }

      } 
      
    }
   
   
    fetchDetails()


  },[])

  
  console.log(paymentSummery)
  if (!item) {
    return (
      <div className="flex items-center justify-center h-screen w-full">

<div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
</div>
</div>
    )
  }
 

  return (
    <div className="bg-white">
       {/* Page Header  */}
      <div className="bg-gray-100 p-1 flex justify-between items-center">
        <div className='ml-3'>
          <h1 className="text-lg text-gray-500">Order</h1>
          <h2 className='font-bold text-xl'>{item.order_number}</h2>
        </div>
        <div>
        
          <button className="bg-white border border-gray-300 text-blue-500 py-1 px-3 hover:bg-gray-50">
            History
          </button>
          <button className="bg-white border border-gray-300 text-blue-500 py-1 px-3 hover:bg-gray-50">
            Discount Item
          </button>
          <button className="bg-white border border-gray-300 text-blue-500 py-1 px-3 mr-3 hover:bg-gray-50">
            Cancel
          </button>
          {/* <button className="bg-white border border-gray-300 text-blue-500 py-1 px-3 mr-4 hover:bg-gray-50">

          </button> */}
        </div>
      </div>
    <div className="bg-white shadow ">
      <div className="w-full mx-auto py-2 px-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-6 gap-4 mb-2 ">
        <div className="col-span-1">
            <h1 className="text-sm  text-gray-500">Order Number</h1>
          </div>
          <div className="col-span-1">
            <h1 className="text-sm  text-gray-500">Shop Name</h1>
          </div>
          <div className="col-span-1">
            <h1 className="text-sm  text-gray-500">Email</h1>
          </div>
          <div className="col-span-1">
            <h1 className="text-sm  text-gray-500">Customer</h1>
          </div>
         
        </div>
        <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
            <p className=" font-semibold text-gray-700">{item.order_number}</p>
          </div>
          <div className="col-span-1">
            <p className=" font-semibold text-gray-700">{item.shop_name}</p>
          </div>
          <div className="col-span-1">
            <p className=" font-semibold text-gray-700">{item.email}</p>
          </div>
          <div className="col-span-1">
            <p className=" font-semibold text-blue-500 underline underline-offset-2"><Link href={""}>Customer Name</Link></p>
          </div>
         
         
        </div>
      </div>
    </div>

    {/* Status Indicator */}
    <StatusIndicator/>
    
    {/* Totals Panel */}
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[22%] border">
          <div className="mb-4 border-b">
            <CardHeader>
              <h1 className="flex font-medium -mt-3 w-16 text-lg text-blue-700 border-b-2 border-blue-700">
                Totals</h1>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1 -mt-2">
                <div className="flex flex-col justify-between border-gray-300 border-b">
                  <span className="text-gray-700 font-medium">Subtotal</span>
                  <span className="text-gray-600">${item.subtotal}</span>
                </div>
                <div className="flex flex-col justify-between border-gray-300 border-b">
                  <span className="text-gray-700 font-medium">Discount</span>
                  <span className="text-gray-600">${item.total_discounts}</span>
                </div>
                
                <div className="flex flex-col justify-between border-gray-300 border-b" >
                  <span className="text-gray-700 font-medium">Tax</span>
                  <span className="text-gray-600">${item.total_tax}</span>
                </div>
                <div className="flex flex-col space-y-1 justify-between font-bold">
                  <span>Total</span>
                  <span>${item.total_price}</span>
                </div>
              </div>
            </CardContent>
          </div>
          <div>
            <CardHeader>
              <CardTitle className="flex font-medium -mt-3 w-24 text-lg text-blue-700 border-b-2 border-blue-700">
                Related List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <Link href="#">Order Summary Routing</Link>
                <Link href="#">Fulfillment Orders (1)</Link>
                <Link href="#">Order Product Summaries (2)</Link>
                <Link href="#">Shipping Addresses (1)</Link>
                <Link href="#">Order Payment Summaries (1)</Link>
                <Link href="#">Order Adjustment Group Summaries (0)</Link>
                <Button className="mt-2" variant="ghost">
                  Show All (11)
                </Button>
              </div>
            </CardContent>
          </div>
        </div>

        
        <div className="bg-white shadow w-[80%] p-0">
      <div className="border-t  border-gray-200">
      <div className="flex border-b">
          <button
              className={`px-4 py-2 w-30 text-lg font-medium text-blue-700 border-b-2 border-blue-700
            `}
            >
              Details
            </button>
            {/* <button
              className={`px-4 py-2 w-30 text-lg font-medium text-gray-500`}
            >
              Marketing
            </button>
            <button
              className={`px-4 py-2 w-30 text-lg font-medium text-gray-500`}
            >
              News
            </button> */}
          </div>
        {/* {activeTab === 'details' && ( */}
          {/* Items List*/}
    <div className="space-y-2 shadow-sm w-[100%]">
      <div className="flex text-lg font-semibold p-1">Order Items</div>

      <Table className=" border rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(lineItems) &&lineItems.map((item : any , i : number) => (
            <TableRow key={i+1} className="text-[16px]">
              <TableCell>{item.product_name}</TableCell>
              <TableCell>{item.quantity }</TableCell>
              <TableCell>{item.price }</TableCell>
            </TableRow>
          ))}
        </TableBody>
     </Table>
          {/* Shipping Adresses Table*/}
          <div className="flex text-lg font-semibold p-1 ">Shipping Addresses (1)</div>

          <Table className="border rounded-lg">
                <TableHeader>
                  <TableRow>
                   
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State/Province</TableHead>
                    <TableHead>Zip</TableHead>
                    
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                   
                    <TableCell>{address[0]?.address1}</TableCell>
                    <TableCell>{address[0]?.city}</TableCell>
                    <TableCell>{address[0]?.state}</TableCell>
                    <TableCell>{address[0]?.zip}</TableCell>
                    
                  </TableRow>
                </TableBody>
              </Table>
          <div className="flex text-lg font-semibold p-1 ">Order Payment Summaries (1)</div>
          <Table className="border rounded-lg">
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Authorized Amount</TableHead>
                    <TableHead>Post Authorized Amount</TableHead>
                    <TableHead>Refunded Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{paymentSummery?.card_type || "N/A"} </TableCell>
                    <TableCell>${paymentSummery?.postauthed_amount}</TableCell>
                    <TableCell>${paymentSummery?.authorized_amount}</TableCell>
                    <TableCell>${paymentSummery?.refunded_amount}</TableCell>
                    <TableCell>{paymentSummery?.date?.toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
      </div>

          
        {/* )} */}
        {/* {activeTab === 'marketing' && ( */}
          {/* <div className="px-4 py-5 border-t">
            <h1>Marketing Data will appear here</h1>
          </div> */}
        {/* )} */}
        {/* {activeTab === 'news' && ( */}
          {/* <div className="px-4 py-5 border-t">
            <h1>News Data will appear here</h1>
          </div> */}
        {/* )} */}
       </div>
      </div>

       <div className="w-full lg:w-1/4 border">
          {/* Cases */}
          <div className="mb-4 border-b">
          <CardHeader>
              <h1 className="flex font-medium -mt-3 w-16 text-lg text-blue-700 border-b-2 border-blue-700">
                Cases</h1>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Case Number</span>
                  <span className="text-blue-500 underline underline-offset-2"><Link href={""}>32</Link></span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Subject</span>
                  <span>Case subject </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Status</span>
                  <span>New</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date</span>
                  <span>04-05-2024</span>
                </div>
              </div>
              </CardContent>
              </div>
         
      </div>
    </div>
    </div>
  )
}