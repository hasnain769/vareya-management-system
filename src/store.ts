import { create } from "zustand";
import { OrderType } from "./utils/types";



type store = {
  orders: OrderType[]
  fetchOrders: () => void;

};

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/ordersDetails`
  : "http://localhost:3000/api/ordersDetails";

export const useStore = create<store>((set : any) => ({
  orders: [],
  fetchOrders: async () => {
    try {
      console.log("first")
      const response = await fetch(`${URL}`);
      const orders = await response.json();
      set({ orders });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  },

}));
