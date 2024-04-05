import { insertLineItem } from '@/database/dbOperations';
import { LineItemType } from '@/database/schema';
import { NextApiRequest } from 'next';
import { useRouter } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import * as url from 'url';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")
  console.log("order fetching ");


  console.log(id)


  try {
    // Define the refresh token
    const refreshToken = "YFVyGZuMHaPoN1EtPDN5xhJ4slIuEG_bRVhbDqArSPw36";

   
    const refreshResponse = await fetch("https://public-api.shiphero.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refresh_token: refreshToken
      })
    });

    // Check if the refresh request was successful
    if (!refreshResponse.ok) {
      throw new Error(`Failed to refresh access token: ${refreshResponse.statusText}`);
    }

    // Extract the access token from the refresh response
    const refreshData = await refreshResponse.json();
    const accessToken = refreshData.access_token;

    const graphqlQuery = `{
        order(id :"${id}",
            ) {
            complexity
            request_id
            data {
               
                        id
                          legacy_id
                        order_number
                                  line_items {
                          edges {
                            node {
                              price
                              product_name
                              quantity
                            }
                          }
    
                        }
              
                                     
                    }
                }
            
        
    }`;
    console.log(graphqlQuery)

    // Make a POST request to the GraphQL API endpoint with the access token in the header
    const graphqlResponse = await fetch("https://public-api.shiphero.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}` // Set the Authorization header with the access token
      },
      body: JSON.stringify({ query: graphqlQuery })
    });

    // Check if the GraphQL request was successful
    if (!graphqlResponse.ok) {
      throw new Error(`Failed to fetch data from GraphQL API: ${graphqlResponse.statusText}`);
    }

    // Extract the GraphQL response data
    const graphqlData = await graphqlResponse.json();
    // console.log(graphqlData)
    const orderData = graphqlData.data.order.data.line_items.edges.map((edge: any) => edge.node);
    console.log(orderData)
    let data :[] =[]
    // orderData.forEach(async(order : any)=>{
    //   data.
    //      data.a ={
    //         order_number : graphqlData.data.order.data.order_number,
    //         price : order.price,
    //         quantity : order.quantity,
    //         product_name : order.product_name,
    //     }
    //     console.log(data)
    //     // await insertLineItem(data)

    // })
    
    
    return NextResponse.json(orderData);
  } catch (error : any) {
    // If an error occurs during the process, return an error response
    console.log("Error:", error);
    return error
  }
}
