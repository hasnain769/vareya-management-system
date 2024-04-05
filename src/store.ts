// import { create } from "zustand";
// import { getLineItems, getOrders, getaddresses, orderstatus } from "./database/dbOperations";
// import { AddressType, LineItemType, OrderType, ShipmentType } from "./database/schema";



// type store = {
//   orders: OrderType[];
//   status : ShipmentType[]
//   address : AddressType[],
//   lineItems : LineItemType[]
//   fetchAddress : (id : any) => void 
//   fetchStatus : (id : any) => void
//   fetchLineItems : (id : any) => void
//   fetchOrders: () => void;

  

// };

// export const useStore = create<store>((set : any) => ({
//   orders: [],
//   status: [],
//   address: [],
//   lineItems: [],
  
//   fetchOrders: async () => {
//     try {
//       console.log("first")
//       const orders = (await getOrders()).reverse()

//       set({ orders });
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   },
//   fetchAddress :async  (id : any) => {
//     const address = await getaddresses(id)
//      set({ address})
     
//   },
//   fetchLineItems: async (id : any) => {
    
    
//     const lineitems = await getLineItems(id)
//     console.log(lineitems)
//     if(lineitems.length < 1){
     
//       // const response = await fetch(`http://localhost:3000/api/single-order-details?id=${item.order_id}`)
//       // console.log(response.body)
//     }
//   },
//   fetchStatus: async (id : any) => {
//     const result = (await orderstatus(id))
//     const status = result.reverse()
//     set({status})
//   },


 


// }));
