export interface CreateComboRequest {
  sections: {
    name: string;
    options: {
      productId: string;
    }[];
  }[];
}
