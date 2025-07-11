import axios from "axios";
import { serverApi } from "../lib/config";
import { Product, ProductInquiry } from "../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCategory)
        url += `&productCollection=${input.productCategory}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      console.log("getProducts:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getProducts:", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Product | null> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getProduct:", result);
      return result.data;
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.warn(`Product with ID ${productId} not found.`);
        return null; // Or handle it how you prefer
      } else {
        console.error("Unexpected error in getProduct:", err);
        throw err;
      }
    }
  }
}

export default ProductService;