export interface CreateOrderRequest {
  customerId: string;
  combos: {
    comboId: string;
    selections: {
      sectionId: string;
      productId: string;
      price: number;
    }[];
  }[];
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
  }[];
}
