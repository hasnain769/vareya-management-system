import { insertCompleteOrder } from '@/database/dbOperations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("order fetching start")
  try {
    // Define the refresh token
    const refreshToken = "YFVyGZuMHaPoN1EtPDN5xhJ4slIuEG_bRVhbDqArSPw36";

    // Make a POST request to refresh endpoint to get the access token
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

    // Define the GraphQL query
    const graphqlQuery = `{
      orders(order_date_from: "2024-02-01T00:00:00",
        order_date_to: "2024-02-01T00:15:00") {
          complexity
          request_id
          data(first: 10) {
              pageInfo {
                  hasNextPage
                  startCursor
                  endCursor
                  hasPreviousPage
              }
              edges {
                  node {
                      id
                      legacy_id
                      shop_name
                      account_id
                      profile
                      email
                      order_number
                      fulfillment_status
                      order_date
                      total_tax
                      subtotal
                      total_price
                      total_discounts
                      holds {
                        fraud_hold
                        payment_hold
                        operator_hold
                        address_hold
                        shipping_method_hold
                        client_hold
                      }
                      shipping_address {
                          address1
                          address2
                          city
                          state
                          zip
                          country
                      }
                  billing_address{
                    address1
                    address2
                    state
                    country
                    country_code
                  }
                     
                  line_items {
                    edges {
                      node {
                        id
                        product_name
                        quantity
                        price
                      }
                    }
                    
                  }
                  }
              }
          }
      }
  }`;

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
    const ordersData = graphqlData.data.orders.data.edges.map((edge: any) => edge.node);
    // console.log(ordersData)
    try {
      await insertCompleteOrder(ordersData)
    }
    catch (error) {
      console.log(error)
    }
    
    return NextResponse.json(ordersData);
  } catch (error : any) {
    // If an error occurs during the process, return an error response
    console.log("Error:", error.Error.message);
    return error
  }
}
