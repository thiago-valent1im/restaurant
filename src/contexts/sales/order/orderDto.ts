export interface CreateOrderRequest {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}
