export interface Article {
  id: number;
  name: string;
  price: number; // in cents
}

export interface CartItem {
  article_id: number;
  quantity: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

export interface Discount {
  article_id: number;
  type: "amount" | "percentage";
  value: number; // cents for "amount", percentage for "percentage"
}

export interface DeliveryFee {
  eligible_transaction_volume: {
    min_price: number;
    max_price: number | null;
  };
  price: number; // in cents
}

export interface InputData {
  articles: Article[];
  carts: Cart[];
  discounts?: Discount[];
  delivery_fees?: DeliveryFee[];
}

export interface CartTotal {
  id: number;
  total: number;       // cart subtotal
  delivery: number;    // delivery fee
  grandTotal: number;  // total + delivery
}

export interface OutputData {
  carts: CartTotal[];
}
