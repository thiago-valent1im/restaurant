export interface CreateOrderRequest {
  items: {
    productId: String;
    quantity: Number;
    unitPrice: Number;
  };
}
