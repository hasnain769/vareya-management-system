import { create } from "zustand";
import { getOrders } from "./database/dbOperations";
import { OrderType } from "./database/schema";



type store = {
  orders: OrderType[];
  fetchOrders: () => void;
  setCurrentOrder: (order : OrderType) => void;
  currentOrder: OrderType;

};

export const useStore = create<store>((set : any) => ({
  orders: [],
  currentOrder :[],
  fetchOrders: async () => {
    try {
      console.log("first")
      const orders = await getOrders()
      console.log(orders)

      set({ orders });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  },
  setCurrentOrder : (order : OrderType) => set({ currentOrder: order }),


}));
