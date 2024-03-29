import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, Select } from "@/components/ui/select"
import { Tabs } from "@/components/ui/tabs"
import Link from "next/link"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { OrderData } from "@/utils/types"
import { orderstatus } from "@/database/dbOperations"
import { useEffect, useState } from "react"

interface OrderDetailsPageProps {
  item: OrderData;
}

export default  function OrderDetailsPage({ item }: OrderDetailsPageProps) {
  console.log(item)
  
  const [status ,setstatus] = useState<any>("")
  useEffect(()=>{
    const fetchstatus =async ()=>{
      const result  = await orderstatus(item.id as any)
      setstatus(result)
    }
    fetchstatus()
  },[])
  
  if (!item) {
    return <div>No item data available.</div>;
  }
 
  console.log(status)
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
              <CardTitle>Order Summary - {item.id}</CardTitle>
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
                    <div>{item.billing_address?.address1}</div>
                    <div>{item.billing_address?.address2}</div>
                    <div>{item.billing_address?.state}</div>
                    <div>{item.billing_address?.country}{item.billing_address?.zip}</div>
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
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>

                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    item.line_items?.edges.map((lineItem) =>(

                  <TableRow>
                    <TableCell>{lineItem.node.product_name}</TableCell>
                    <TableCell>{item.fulfillment_status}</TableCell>
                    <TableCell>{lineItem.node.quantity}</TableCell>
                    <TableCell>${lineItem.node.price}</TableCell>

                  </TableRow>
                    ))
                  }
                  
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
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State/Province</TableHead>
                    <TableHead>Zip</TableHead>
                    
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{item.shop_name}</TableCell>
                    <TableCell>{item.shipping_address?.address1}</TableCell>
                    <TableCell>{item.shipping_address?.city}</TableCell>
                    <TableCell>{item.shipping_address?.state}</TableCell>
                    <TableCell>{item.shipping_address?.zip}</TableCell>
                    
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