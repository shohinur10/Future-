import { Product } from "../types/product";
import { ProductCategory, ProductMaterialType, ProductStyleType, ProductStatus } from "../enums/product.enum";

export const mockProducts: Product[] = [
  {
    _id: "1",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.BEDROOM,
    productName: "Vivente Product 01",
    productPrice: 491151,
    productLeftCount: 10,
    productDesc: "Highlights product specifications, highlights product specifications, highlights product specifications.",
    productImages: ["/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-1.jpg"],
    productViews: 15,
    productMaterialType: ProductMaterialType.WOOD,
    productStyleType: ProductStyleType.MODERN,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.BEDROOM,
    productName: "Vivente Product 02",
    productPrice: 491151,
    productLeftCount: 8,
    productDesc: "Highlights product specifications, highlights product specifications, highlights product specifications.",
    productImages: ["/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-2.jpg"],
    productViews: 23,
    productMaterialType: ProductMaterialType.FABRIC,
    productStyleType: ProductStyleType.CONTEMPORARY,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.BEDROOM,
    productName: "Vivente Product 03",
    productPrice: 491151,
    productLeftCount: 5,
    productDesc: "Highlights product specifications, highlights product specifications, highlights product specifications.",
    productImages: ["/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-3.jpg"],
    productViews: 18,
    productMaterialType: ProductMaterialType.WOOD,
    productStyleType: ProductStyleType.MODERN,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.BEDROOM,
    productName: "Vivente Product 04",
    productPrice: 491151,
    productLeftCount: 12,
    productDesc: "Highlights product specifications, highlights product specifications, highlights product specifications.",
    productImages: ["/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-4.jpg"],
    productViews: 31,
    productMaterialType: ProductMaterialType.METAL,
    productStyleType: ProductStyleType.INDUSTRIAL,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "5",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.KITCHEN,
    productName: "Kitchen Cabinet Set",
    productPrice: 750000,
    productLeftCount: 20,
    productDesc: "Modern kitchen cabinet set with premium wood finish and soft-close doors.",
    productImages: ["/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-5.jpg"],
    productViews: 42,
    productMaterialType: ProductMaterialType.WOOD,
    productStyleType: ProductStyleType.MODERN,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "6",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.OFFICE,
    productName: "Executive Office Chair",
    productPrice: 325000,
    productLeftCount: 15,
    productDesc: "Ergonomic office chair with premium leather upholstery and adjustable height.",
    productImages: ["/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-6.jpg"],
    productViews: 28,
    productMaterialType: ProductMaterialType.LEATHER,
    productStyleType: ProductStyleType.CONTEMPORARY,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "7",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.OUTDOOR,
    productName: "Garden Dining Set",
    productPrice: 890000,
    productLeftCount: 10,
    productDesc: "Weather-resistant outdoor dining set perfect for garden parties and family gatherings.",
    productImages: ["/img/RoundSofa_Beige_1024x1024.webp"],
    productViews: 35,
    productMaterialType: ProductMaterialType.BAMBOO,
    productStyleType: ProductStyleType.RUSTIC,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "8",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.KIDS,
    productName: "Kids Study Desk",
    productPrice: 245000,
    productLeftCount: 25,
    productDesc: "Colorful and functional study desk designed specifically for children's comfort and productivity.",
    productImages: ["/img/5-seater-living-room-sofa-set.jpg"],
    productViews: 19,
    productMaterialType: ProductMaterialType.WOOD,
    productStyleType: ProductStyleType.MINIMALIST,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "9",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.OTHER,
    productName: "Decorative Mirror",
    productPrice: 180000,
    productLeftCount: 30,
    productDesc: "Elegant decorative mirror with ornate frame, perfect for enhancing any room's aesthetics.",
    productImages: ["/img/ai-generated-vintage-leather-tufted-sofa-free-png.png"],
    productViews: 14,
    productMaterialType: ProductMaterialType.GLASS,
    productStyleType: ProductStyleType.VINTAGE,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "10",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.BEDROOM,
    productName: "Luxury Bed Frame",
    productPrice: 1200000,
    productLeftCount: 8,
    productDesc: "Premium wooden bed frame with elegant headboard design and superior craftsmanship.",
    productImages: ["/img/furniture.webp"],
    productViews: 67,
    productMaterialType: ProductMaterialType.WOOD,
    productStyleType: ProductStyleType.SCANDINAVIAN,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "11",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.KITCHEN,
    productName: "Marble Kitchen Island",
    productPrice: 1500000,
    productLeftCount: 12,
    productDesc: "Stunning marble kitchen island with built-in storage and premium finishing.",
    productImages: ["/img/beautiful-living-room-furniture-background-wall-texture-from-interior-design-mockup_872147-3512.avif"],
    productViews: 89,
    productMaterialType: ProductMaterialType.MARBLE,
    productStyleType: ProductStyleType.MODERN,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "12",
    productStatus: ProductStatus.PROCESS,
    productCategory: ProductCategory.OFFICE,
    productName: "Glass Conference Table",
    productPrice: 980000,
    productLeftCount: 20,
    productDesc: "Modern glass conference table perfect for professional meetings and presentations.",
    productImages: ["/img/banner.webp"],
    productViews: 52,
    productMaterialType: ProductMaterialType.GLASS,
    productStyleType: ProductStyleType.MINIMALIST,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Filter products by category
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return mockProducts.filter(product => product.productCategory === category);
};

// Sort products by different criteria
export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'createdAt':
      return sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'productPrice':
      return sortedProducts.sort((a, b) => a.productPrice - b.productPrice);
    case 'productViews':
      return sortedProducts.sort((a, b) => b.productViews - a.productViews);
    default:
      return sortedProducts;
  }
};

// Search products by name or description
export const searchProducts = (products: Product[], searchTerm: string): Product[] => {
  if (!searchTerm.trim()) return products;
  
  const term = searchTerm.toLowerCase();
  return products.filter(product => 
    product.productName.toLowerCase().includes(term) ||
    (product.productDesc && product.productDesc.toLowerCase().includes(term)) ||
    product.productMaterialType.toLowerCase().includes(term)
  );
};

// Paginate products
export const paginateProducts = (products: Product[], page: number, limit: number): Product[] => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return products.slice(startIndex, endIndex);
}; 