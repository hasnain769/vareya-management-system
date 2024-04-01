import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { config } from 'dotenv';
import { updateStatus } from '@/database/dbOperations';

config();

export async function GET(req: NextRequest) : Promise<any> {
    const API_KEY = process.env.POSTNL_API_KEY;
    const  customernumber = process.env.CUSTOMER_NUMBER // Extracting customer number from path parameter
    try {
        // Construct the URL with query parameters
        const postnlTrackingUrlSandbox = `https://api.postnl.nl/shipment/v2/status/${customernumber}/updatedshipments`;
        
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
            const data = response.data;
            const extractedData = data.map((item:any) => {
                return {
                    barcode: item.Barcode,
                    statusCode: item.Status.StatusCode,
                    statusDescription: item.Status.StatusDescription
                };
            });
            console.log(extractedData)
            await updateStatus(extractedData) 
            return NextResponse.json(data);
        } 
    } catch (error) {
        console.error(error);
        // Return an error response
        return error
    }
}
