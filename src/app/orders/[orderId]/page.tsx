
import OrderDetails from "@/app/screens/order-details"

export default  function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  console.log(params.orderId);
  return (
    <div>
        <OrderDetails params={{
        orderId: params.orderId
      }} />
      

    </div>
  )
}