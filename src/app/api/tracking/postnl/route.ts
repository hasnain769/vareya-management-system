import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { config } from 'dotenv';

config();

export async function GET(req: NextRequest) {
    const API_KEY = process.env.POSTNL_API_KEY;
    const  customernumber = process.env.CUSTOME_NUMBER // Extracting customer number from path parameter
    try {
        // Construct the URL with query parameters
        const postnlTrackingUrlSandbox = `https://api-sandbox.postnl.nl/shipment/v2/status/${customernumber}/updatedshipments`;
        
        // Construct the query parameters
        const queryParams = {
            period: [
                '2024-03-20T00:00:00',
                '2024-03-20T23:59:59'
            ]
        };

        // Fetch data from PostNL API with the API key included in the headers
        const response = await axios.get(postnlTrackingUrlSandbox, {
            headers: {
                'Accept': 'application/json',
                'apikey': API_KEY
            },
            params: queryParams
        });

        // Handle different HTTP status codes
        if (response.status === 200) {
            // Success response
            const data = response.data;
            console.log(data); // Log the data received from the API
            return NextResponse.json(data);
        } else if (response.status === 400) {
            // Invalid request
            throw new Error('Invalid request: ' + response.data.message);
        } else if (response.status === 401) {
            // Invalid apikey
            throw new Error('Invalid apikey: ' + response.data.message);
        } else if (response.status === 405 || response.status === 429 || response.status === 500) {
            // Method not allowed, Too many requests, or Internal server error
            throw new Error('Server error: ' + response.data.message);
        } else {
            // Other status codes
            throw new Error('Unexpected error occurred. Status code: ' + response.status);
        }
    } catch (error) {
        console.error(error);
        // Return an error response
        return 
    }
}
