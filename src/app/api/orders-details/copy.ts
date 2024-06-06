import { insertCompleteOrder } from '@/database/dbOperations';
import { date } from 'drizzle-orm/mysql-core';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/utils/logger';

export const maxDuration = 60;
export async function POST(req: NextRequest) {
  console.log("order fetching start")
  console.log("start function")
  try {
    // Define the refresh token
    const refreshToken = process.env.SHIPHERO_REFRESH_TOKEN

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
    console.log(refreshResponse)

    // Check if the refresh request was successful
    // if (!refreshResponse.ok) {
    //   throw new Error(`Failed to refresh access token: ${refreshResponse.statusText}`);
    // }
    console.log("token refreshed")
    // Extract the access token from the refresh response
    const refreshData = await refreshResponse.json();
    console.log("access token: " ,refreshData)
    const accessToken = refreshData.access_token;
    logger.info("access token :",accessToken);
    const currentTime = new Date();
    const ordersFromDate = new Date(currentTime.getTime() - 17 * 60000); // Subtract 15 minutes from current time
    const ordersToDate = currentTime;
    logger.info("orders from date :", ordersFromDate.toISOString(),"to date :", ordersToDate.toISOString());
    console.log(accessToken)

    console.log(ordersFromDate.toISOString())
    console.log(ordersToDate.toISOString())
    let isNextPageAvailable =  false;
    let nextPageCursor = "" 

    // Define the GraphQL query with dynamic dates
    // do {

        const graphqlQuery = `{
          orders(order_date_from: "${ordersFromDate.toISOString()}",
            order_date_to: "${ordersToDate.toISOString()}") {
              complexity
              request_id
              
              data${isNextPageAvailable ? `(after: "${nextPageCursor}")` : `(first: 100)`} {
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
                              first_name
                              last_name
                              email
                              phone
                              address1
                              address2
                              city
                              state
                              zip
                              country
                          }
                          authorizations {
                            transaction_id
                            date
                            card_type
                            postauthed_amount
                            authorized_amount
                            refunded_amount
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
        isNextPageAvailable = graphqlData.data.orders.data.pageInfo.hasNextPage;
        nextPageCursor = graphqlData.data.orders.data.pageInfo.endCursor;
        console.log(isNextPageAvailable)
        console.log(nextPageCursor)
        
        logger.info(`Orders get from shiphero on ${ordersToDate.toISOString()}` ,ordersData)
        try {
          const result = await insertCompleteOrder(ordersData)
          console.log(result)
          logger.info(result)
          return NextResponse.json(result);
        }
        catch (error) {
          console.log(error)
          return NextResponse.json(error);     
          //logger.error(error)
        }
    // } while (isNextPageAvailable);
    
    // return NextResponse.json(ordersData);
  } catch (error : any) {
    // If an error occurs during the process, return an error response
    // console.log("Error:", error.Error.message);
    return error
  }
}
    
// export const fetchCache = 'force-no-store'


