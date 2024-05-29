import Dashboard from "@/app/screens/Dashboard";
import { Order } from "@/database/schema";
import Link from "next/link";


export const maxDuration = 45;
export const dynamic = 'force-dynamic';

async function getListOrders() {
  try {
    const apiUrl = process.env.API_URL_ORDERS;
    if (!apiUrl) {
      console.error("API_URL_ORDERS environment variable is not set");
      return [];
    }

    console.log(`Fetching orders from: ${apiUrl}`);
    const startTime = Date.now();

    const response = await fetch(apiUrl, { cache: "no-store" });
    if (!response.ok) {
      console.error(`Error fetching orders: ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    const responseTime = Date.now() - startTime;
    console.log(`Fetched orders in ${responseTime}ms`);
    console.log(data)
    return data.allOrders as Order[];
  } catch (err) {
    console.error("Error in getListOrders:", err);
    return [];
  }
}
export default async  function Home() {
  const data  = await getListOrders()
  return(
    <Dashboard orders={data}></Dashboard>
  )
}
