import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, CircularProgress, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCategory} from "../../lib/enums/product.enum";
import { serverApi } from "../../lib/config";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../lib/types/search";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

// ProductCard Component
interface ProductCardProps {
  product: Product;
  onAdd: (item: CartItem) => void;
  onProductClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onProductClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  
  const imagePath = `${serverApi}/${product.productImages[0]}`;
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    onAdd({
      _id: product._id,
      quantity: quantity,
      name: product.productName,
      price: product.productPrice,
      image: product.productImages[0],
    });
    
    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1); // Reset quantity after adding
    }, 500);
  };

  const handleQuantityChange = (change: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newQuantity = Math.max(1, Math.min(10, quantity + change));
    setQuantity(newQuantity);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd({
      _id: product._id,
      quantity: 1,
      name: product.productName,
      price: product.productPrice,
      image: product.productImages[0],
    });
  };

  return (
    <Stack
      key={product._id}
      className={"product-card"}
      onClick={() => onProductClick(product._id)}
    >
      <Box className={"product-img"}>
        <img
          src={imagePath}
          alt={product.productName}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/img/default-furniture.svg";
          }}
        />
        
        <div className={"product-sale"}>
          {product.productMaterialType}
        </div>
        
        {/* Quick Cart Button (Small overlay) */}
        <Button
          className={"shop-btn-quick"}
          onClick={handleQuickAdd}
          title="Quick add to cart"
        >
          <ShoppingCartIcon sx={{ color: '#4c51bf', fontSize: '1.1rem' }} />
        </Button>
        
        <Button className={"view-btn"} title="View product details">
          <Badge
            badgeContent={product.productViews}
            color="secondary"
            sx={{
              '& .MuiBadge-badge': {
                background: '#4c51bf',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600
              }
            }}
          >
            <RemoveRedEyeIcon
              sx={{
                color: product.productViews === 0 ? "#94a3b8" : "#4c51bf",
                fontSize: '1.1rem'
              }}
            />
          </Badge>
        </Button>
      </Box>
      
      <Box className={"product-desc"}>
        <span className={"product-title"}>
          {product.productName}
        </span>
        <div className={"product-price"}>
          <MonetizationOnIcon sx={{ fontSize: '1rem', color: '#4c51bf' }} />
          <span>${product.productPrice.toLocaleString()}</span>
        </div>
        
        {/* Enhanced Cart Controls */}
        <Box className={"cart-controls"} onClick={(e) => e.stopPropagation()}>
          <Box className={"quantity-controls"}>
            <Button 
              size="small" 
              className={"quantity-btn"}
              onClick={(e) => handleQuantityChange(-1, e)}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className={"quantity-display"}>{quantity}</span>
            <Button 
              size="small" 
              className={"quantity-btn"}
              onClick={(e) => handleQuantityChange(1, e)}
              disabled={quantity >= 10}
            >
              +
            </Button>
          </Box>
          
          <Button
            variant="contained"
            className={"add-to-cart-btn"}
            onClick={handleAddToCart}
            disabled={isAdding}
            startIcon={isAdding ? <CircularProgress size={16} color="inherit" /> : <ShoppingCartIcon />}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 12,
    order: "createdAt",
    productCategory: ProductCategory.BEDROOM,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch products when search criteria change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
    const product = new ProductService();
        const data = await product.getProducts(productSearch);
        setProducts(data);
      } catch (err) {
        console.log("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearch]); // Removed setProducts from dependencies to prevent infinite loop

  /** HANDLERS **/
  const searchCategoryHandler = (category: ProductCategory) => {
    setProductSearch(prev => ({
      ...prev,
      page: 1,
      productCategory: category,
    }));
  };

  const searchOrderHandler = (order: string) => {
    setProductSearch(prev => ({
      ...prev,
      page: 1,
      order,
    }));
  };

  const searchProductHandler = () => {
    setProductSearch(prev => ({
      ...prev,
      page: 1,
      search: searchText.trim(),
    }));
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    setProductSearch(prev => ({
      ...prev,
      page: value,
    }));
  };

  const chosenProductHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container maxWidth="xl">
        <Stack flexDirection={"column"} alignItems={"center"}>
          {/* Hero Search Section */}
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p>Discover Premium Furniture</p>
              <Stack className={"single-search-big-box"}>
                <input
                  type={"search"}
                  className={"single-search-input"}
                  name={"singleResearch"}
                  placeholder={"Search furniture..."}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className={"single-button-search"}
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </Stack>
            </Stack>
          </Stack>

          {/* Category Filter Section */}
          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                {Object.values(ProductCategory).map((category) => (
              <Button
                    key={category}
                  variant={"contained"}
                    className={productSearch.productCategory === category ? "Mui-selected" : ""}
                    onClick={() => searchCategoryHandler(category)}
                    disabled={loading}
                >
                    {category}
                </Button>
                ))}
              </div>
            </Stack>

            {/* Sort Filter Section */}
            <Stack className={"dishes-filter-section"}>
              <Stack className={"dishes-filter-box"}>
                <Button
                  variant={"contained"}
                  className={`order ${productSearch.order === "createdAt" ? "Mui-selected" : ""}`}
                  onClick={() => searchOrderHandler("createdAt")}
                  disabled={loading}
                >
                  New
                </Button>
                <Button
                  variant={"contained"}
                  className={`order ${productSearch.order === "productPrice" ? "Mui-selected" : ""}`}
                  onClick={() => searchOrderHandler("productPrice")}
                  disabled={loading}
                >
                  Price
                </Button>
                <Button
                  variant={"contained"}
                  className={`order ${productSearch.order === "productViews" ? "Mui-selected" : ""}`}
                  onClick={() => searchOrderHandler("productViews")}
                  disabled={loading}
                >
                  Views
                </Button>
              </Stack>
            </Stack>

            {/* Loading State */}
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={40} sx={{ color: '#4c51bf' }} />
              </Box>
            )}

            {/* Products Grid */}
            <Stack className={"product-wrapper"}>
              {!loading && products.length !== 0 ? (
                products.map((product: Product) => (
                  <ProductCard
                      key={product._id}
                    product={product}
                    onAdd={onAdd}
                    onProductClick={chosenProductHandler}
                  />
                ))
              ) : !loading ? (
                <Box className="no-data">
                  <Typography variant="h6" sx={{ mb: 1, color: '#64748b' }}>
                    No products found
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Try adjusting your search criteria or browse different categories
                  </Typography>
                      </Box>
              ) : null}
            </Stack>
          </Stack>

          {/* Pagination */}
          {!loading && products.length > 0 && (
          <Stack className={"pagination-section"}>
            <Pagination
                count={Math.max(productSearch.page + (products.length === productSearch.limit ? 1 : 0), productSearch.page)}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                />
              )}
              onChange={paginationHandler}
                disabled={loading}
            />
          </Stack>
          )}
        </Stack>
      </Container>

      {/* Address Section */}
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Visit Our Showroom</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
              width="100%"
              height="400"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
