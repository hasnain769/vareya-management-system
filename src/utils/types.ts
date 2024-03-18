export type OrderType = {
    id: string;
    legacy_id: number;
    shop_name: string;
    order_number: string;
    fulfillment_status: string;
    order_date: string;
    holds: {
      fraud_hold: boolean;
      payment_hold: boolean;
      operator_hold: boolean;
      address_hold: boolean;
      shipping_method_hold: boolean;
      client_hold: boolean;
    };
    shipping_address: {
      address1: string;
      address2: string | null;
      city: string;
      state: string | null;
      zip: string;
      country: string;
    };
  };