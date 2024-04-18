"use client"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, Select } from "@/components/ui/select"
import { Tabs } from "@/components/ui/tabs"
import Link from "next/link"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {  getLineItems, getSingleOrder, getaddresses, orderstatus } from "@/database/dbOperations"
import { useEffect, useState } from "react"
import { AddressType, LineItemType, OrderType, ShipmentType } from "@/database/schema"
// import { useStore } from "@/store"
import { useSearchParams , useRouter} from "next/navigation"
//import { useRouter } from 'next/router';


export default  function OrderDetailsPage() {
  const [item ,setItem] = useState <OrderType> ()
  const [address, setAddress] = useState <AddressType[]>([])
  const[status , setstatus] = useState<ShipmentType []> ([])
  const [lineItems, setlineItem] = useState < any | null>(null)
  const searchParams = useSearchParams()
 
  const id = searchParams.get('id')
  console.log(id)
 



  useEffect(()=>{
    const fetchDetails =async ()=>{
      console.log(id)
      let addr : any =""
      let orderNumber : any = ""
      let Oid : any = ""
      try{

        const result = await getSingleOrder(id)
        addr = result[0]?.shipping_address_id 
        orderNumber = result[0]?.order_number
        Oid = result[0]?.order_id
        console.log(Oid)
        setItem(result[0])
      }finally{

        console.log(orderNumber)
        const add = await getaddresses(addr)
        const statusData = (await orderstatus(orderNumber)).reverse()
        setAddress(add)
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
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 p-4 border-r">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Totals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${item.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>{item.total_discounts}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${item.total_tax}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${item.total_price}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Actions & Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs>
                <div className="flex justify-between">
                  <Button variant="outline">Actions</Button>
                  <Button variant="outline">History</Button>
                </div>
                <div className="mt-4">
                  <Button className="w-full mb-2">Add</Button>
                  <Select>
                    <SelectTrigger id="action">
                      <SelectValue placeholder="Cancel Item" />
                    </SelectTrigger>
                  </Select>
                  <Select >
                    <SelectTrigger id="action">
                      <SelectValue placeholder="Discount Item" />
                    </SelectTrigger>
                  </Select>
                  <Select >
                    <SelectTrigger id="action">
                      <SelectValue placeholder="RMA Return" />
                    </SelectTrigger>
                  </Select>
                  <Select>
                    <SelectTrigger id="action">
                      <SelectValue placeholder="Return Item" />
                    </SelectTrigger>
                  </Select>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Related List Quick Links</CardTitle>
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
          </Card>
        </div>
        <div className="w-full lg:w-3/4 p-4">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Order Summary - {item.order_number}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <div className="font-bold">{item.shop_name}</div>
                  <div className="mt-1">
                    <div>Account: {item.profile}</div>
                  
                    <div>Email: {item.email}</div>
                    <div>SFCC Customer Number</div>
                    <div>SFCC Customer ID : {item.account_id}</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold">Billing Address</div>
                  <div className="mt-1">
                    <div>{address[0]?.address1}</div>
                    <div>{address[0]?.address2}</div>
                    <div>{address[0]?.state}</div>
                    <div>{address[0]?.country}</div>
                    <div>{address[0]?.zip}</div>
                  </div>
                  <div className="font-bold mt-4">Sales Channel</div>
                  <div className="mt-1">nto</div>
                </div>
                <div>
                  <div className="font-bold">Tax Locale Type</div>
                  <div className="mt-1">Net</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="mb-4">
  <CardHeader>
    <CardTitle>Items</CardTitle>
  </CardHeader>

  <CardContent>
    {!lineItems  ? (

      
    <div className="flex space-x-2 justify-center items-center bg-white  dark:invert">
    <span className='sr-only'>Loading...</span>

  	<div className='h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-3 w-3 bg-black rounded-full animate-bounce'></div>
  </div>

      
  
    ) : (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lineItems.map((item : any , i : number) => (
            <TableRow key={i+1}>
              <TableCell>{item.product_name}</TableCell>
              <TableCell>{item.quantity }</TableCell>
              <TableCell>{item.price }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </CardContent>
</Card>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking no</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>carrier</TableHead>
                    <TableHead>Tracking Url</TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  

                  <TableRow >
                  <TableCell>{status[0]?.tracking_number || " N/A"}</TableCell>
                    <TableCell>{ status[0]?.status || "pending"}</TableCell>
                    <TableCell>{status[0]?.shipping_carrier|| "N/A"}</TableCell>
                  </TableRow>
                
                  
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Shipping Addresses (1)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Payment Summaries (1)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Authorized</TableHead>
                    <TableHead>Captured</TableHead>
                    <TableHead>Refunded</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* <TableRow>
                    <TableCell>Visa - 1111</TableCell>
                    <TableCell>Jessica Carvajal</TableCell>
                    <TableCell>$217.34</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>$0.00</TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}