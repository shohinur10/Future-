import axios from "axios";
import { serverApi } from "../lib/config";
import { Product, ProductInquiry } from "../lib/types/product";
import { mockProducts, getProductsByCategory, sortProducts, searchProducts, paginateProducts } from "../lib/data/mockProducts";

class ProductService {
  private readonly path: string;
  private useMockData: boolean = false;

  constructor() {
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      // Try API first
      if (!this.useMockData) {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCategory)
        url += `&productCategory=${input.productCategory}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      console.log("getProducts:", result);
      return result.data;
      }
    } catch (err) {
      console.log("API not available, using mock data:", err);
      this.useMockData = true;
    }

    // Use mock data
    console.log("Using mock data for products");
    let products = [...mockProducts];

    // Filter by category
    if (input.productCategory) {
      products = getProductsByCategory(input.productCategory);
    }

    // Search filter
    if (input.search) {
      products = searchProducts(products, input.search);
    }

    // Sort products
    products = sortProducts(products, input.order);

    // Paginate
    products = paginateProducts(products, input.page, input.limit);

    return products;
  }

  public async getProduct(productId: string): Promise<Product | null> {
    try {
      // Try API first
      if (!this.useMockData) {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getProduct:", result);
      return result.data;
      }
    } catch (err: any) {
      console.log("API not available, using mock data:", err);
      this.useMockData = true;
    }

    // Use mock data
    console.log("Using mock data for product:", productId);
    const product = mockProducts.find(p => p._id === productId);
    return product || null;
  }

  public async likeProduct(productId: string): Promise<boolean> {
    try {
      // Try API first
      if (!this.useMockData) {
        const url = `${this.path}/product/${productId}/like`;
        const result = await axios.post(url, {}, { withCredentials: true });
        console.log("likeProduct:", result);
        return result.data?.success || true;
      }
    } catch (err: any) {
      console.log("API not available for like, using mock:", err);
      this.useMockData = true;
    }

    // Mock like functionality
    console.log("Mock like for product:", productId);
    return true;
  }

  public async viewProduct(productId: string): Promise<boolean> {
    try {
      // Try API first
      if (!this.useMockData) {
        const url = `${this.path}/product/${productId}/view`;
        const result = await axios.post(url, {}, { withCredentials: true });
        console.log("viewProduct:", result);
        return result.data?.success || true;
      }
    } catch (err: any) {
      console.log("API not available for view, using mock:", err);
      this.useMockData = true;
    }

    // Mock view functionality
    console.log("Mock view for product:", productId);
    const product = mockProducts.find(p => p._id === productId);
    if (product) {
      product.productViews = (product.productViews || 0) + 1;
    }
    return true;
  }
}

export default ProductService;