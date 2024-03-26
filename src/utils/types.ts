type Holds = {
  fraud_hold?: boolean;
  payment_hold?: boolean;
  operator_hold?: boolean;
  address_hold?: boolean;
  shipping_method_hold?: boolean;
  client_hold?: boolean;
};

type Address = {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  country_code?: string | null;
};

type LineItem = {
  id: string;
  product_name: string;
  quantity: number;
  price: string;
};

export type OrderData = {
  id?: string;
  legacy_id?: number;
  shop_name?: string;
  account_id?: string;
  profile?: string;
  email?: string;
  order_number?: string;
  fulfillment_status?: string;
  order_date?: string;
  total_tax?: string;
  subtotal?: string;
  total_price?: string;
  total_discounts?: string;
  holds?: Holds;
  shipping_address?: Address;
  billing_address?: Address;
  line_items?: {
    edges: Array<{ node: LineItem }>;
  };
};