import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SelectValue, SelectTrigger, Select } from "@/components/ui/select"
import { Tabs } from "@/components/ui/tabs"
import Link from "next/link"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function OrderDetailsPage() {
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
                  <span>$199.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Adjustments</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$7.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$10.35</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>$217.34</span>
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
              <CardTitle>Order Summary - 00006403</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <div className="font-bold">Jessica Carvajal</div>
                  <div className="mt-1">
                    <div>Account: Jessica Carvajal</div>
                    <div>SFCC Store Site ID</div>
                    <div>SFCC Username</div>
                    <div>Home Phone: (956) 467-7057</div>
                    <div>Email: jessica.carvajal@salesforce.com</div>
                    <div>SFCC Customer Number</div>
                    <div>SFCC Customer ID</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold">Billing Address</div>
                  <div className="mt-1">
                    <div>2204 Rio Mesa Dr</div>
                    <div>Austin, TX 78732</div>
                    <div>US</div>
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
                    <TableHead>Line Adjustments</TableHead>
                    <TableHead>Tax</TableHead>
                    <TableHead>Line Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Shipping</TableCell>
                    <TableCell>Allocated</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>$7.99</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>$0.40</TableCell>
                    <TableCell>$8.39</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Men's Flight Jacket</TableCell>
                    <TableCell>Allocated</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>$199.00</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>$9.95</TableCell>
                    <TableCell>$208.95</TableCell>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>State/Province</TableHead>
                    <TableHead>Zip</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Jessica Carvajal</TableCell>
                    <TableCell>2204 Rio Mesa Dr</TableCell>
                    <TableCell>Austin</TableCell>
                    <TableCell>TX</TableCell>
                    <TableCell>78732</TableCell>
                    <TableCell>Ground Delivery Method</TableCell>
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
                  <TableRow>
                    <TableCell>Visa - 1111</TableCell>
                    <TableCell>Jessica Carvajal</TableCell>
                    <TableCell>$217.34</TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>$0.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}