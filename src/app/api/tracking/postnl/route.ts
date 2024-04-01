import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { config } from 'dotenv';

config();



export async function GET(req: NextRequest) {
    const CUSTOMER_CODE = process.env.POSTNL_CUSTOMER_CODE;
    const CUSTOMER_NUMBER = process.env.POSTNL_CUSTOMER_NUMBER;
    const API_KEY = process.env.POSTNL_API_KEY;
    try {
        // Construct the query parameters as a plain JavaScript object
        const queryParams : any = {
            detail: 'true',
            language: 'NL',
            customerCode: "PBWZ",
            customerNumber: "10734019",
            reference: 'REF98173245876329'
        };

        // Construct the URL with query parameters
        const queryString = new URLSearchParams(queryParams);
        console.log(queryString)

        // Construct the URL with query parameters
        const postnlTrackingUrlSandbox = `https://api-sandbox.postnl.nl/shipment/v2/status/reference?${queryString}`;
        console.log(postnlTrackingUrlSandbox)
        // Fetch data from PostNL API with the API key included in the headers
        const response = await axios.get(postnlTrackingUrlSandbox, {
            headers: {
                'apikey': "e4bQ4UnIQH7dpbstDnn2AiMhBjq6nhZf"
            }
        });
        console.log(response)
        // Check if the response is successful
        if (response.status !== 200) {
            throw new Error('Failed to fetch data from PostNL API');
        }

        // Parse the JSON response
        const data = response.data;
        console.log(data); // Log the data received from the API

        // Return the response data
        return (data);
    } catch (error) {
        console.error(error);
        // Return an error response
        return 
    }
}
