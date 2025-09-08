import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, CircularProgress, Typography, Card, CardContent, CardMedia, Chip, Avatar, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
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

// Standard Vertical ProductCard Component (400px x 370px)
interface ProductCardProps {
  product: Product;
  onAdd: (item: CartItem) => void;
  onProductClick: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd, onProductClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const fallbackImages = [
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-1.jpg",
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-2.jpg",
    "/img/5-seater-living-room-sofa-set.jpg",
    "/img/RoundSofa_Beige_1024x1024.webp",
    "/img/ai-generated-vintage-leather-tufted-sofa-free-png.png"
  ];
  
  // Use local images from public folder when API is not available or image fails
  const getImagePath = (imagePath: string) => {
    // If it's already a full URL, use as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // If it starts with /, it's a local path, use as is
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    // Otherwise, try server API first, fallback to local
    return `${serverApi}/${imagePath}`;
  };

  const imagePath = imageError ? 
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)] : 
    (product.productImages && product.productImages[0] ? getImagePath(product.productImages[0]) : fallbackImages[0]);
  
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
    
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 500);
  };

  const handleQuantityChange = (change: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newQuantity = Math.max(1, Math.min(10, quantity + change));
    setQuantity(newQuantity);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      sx={{
        width: '400px',
        height: '370px',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        border: '1px solid #f8fafc',
        background: 'white',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
        }
      }}
      onClick={() => onProductClick(product._id)}
    >
      {/* Image Section - Now 85% of card height for maximum photo focus */}
      <Box sx={{ 
        position: 'relative',
        height: '320px', // Increased from 280px - more space for photos
        width: '100%',
        overflow: 'hidden'
      }}>
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          image={imagePath}
          alt={product.productName}
          onError={handleImageError}
        />
        
        {/* Minimal Price Badge - Only essential info */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#2d3748',
            borderRadius: '12px',
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: '1rem',
            fontWeight: 700,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <AttachMoneyIcon sx={{ fontSize: '1.1rem', color: '#10b981' }} />
          {product.productPrice.toLocaleString()}
        </Box>
      </Box>

      {/* Compact Content Section - Just the essentials */}
      <CardContent sx={{ 
        flex: 1,
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 1.5,
        '&:last-child': { pb: 1.5 }
      }}>
        {/* Product Title Only */}
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          color: '#2d3748',
          fontSize: '0.95rem',
          lineHeight: 1.2,
          mb: 1,
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          '-webkit-line-clamp': 2,
          '-webkit-box-orient': 'vertical'
        }}>
          {product.productName}
        </Typography>

        {/* Simplified Controls - Focus on purchasing */}
        <Box onClick={(e) => e.stopPropagation()} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Compact Quantity Controls */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <Button 
              size="small"
              onClick={(e) => handleQuantityChange(-1, e)}
              disabled={quantity <= 1}
              sx={{ 
                minWidth: '28px',
                width: '28px',
                height: '28px',
                color: '#667eea',
                '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
              }}
            >
              -
            </Button>
            <Typography sx={{ 
              fontWeight: 600,
              fontSize: '0.9rem',
              minWidth: '24px',
              textAlign: 'center',
              color: '#2d3748',
              px: 0.5
            }}>
              {quantity}
            </Typography>
            <Button 
              size="small"
              onClick={(e) => handleQuantityChange(1, e)}
              disabled={quantity >= 10}
              sx={{ 
                minWidth: '28px',
                width: '28px',
                height: '28px',
                color: '#667eea',
                '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
              }}
            >
              +
            </Button>
          </Box>
          
          {/* Add to Cart Button */}
          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={isAdding}
            startIcon={isAdding ? <CircularProgress size={14} color="inherit" /> : <ShoppingCartIcon />}
            sx={{
              flex: 1,
              py: 0.75,
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                boxShadow: 'none'
              }
            }}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </Box>
      </CardContent>
    </Card>
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
  }, [productSearch]);

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
          <Box sx={{ 
            width: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 4,
            mb: 4,
            borderRadius: '16px',
            textAlign: 'center'
          }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700,
              mb: 2,
              letterSpacing: '-0.02em'
            }}>
              Discover Premium Furniture
            </Typography>
            <Typography variant="subtitle1" sx={{ 
              opacity: 0.9,
              mb: 3,
              fontSize: '1.1rem'
            }}>
              Browse our curated collection of luxury furniture pieces
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              maxWidth: '600px',
              mx: 'auto',
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
              <input
                type="search"
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  border: 'none',
                  outline: 'none',
                  fontSize: '1rem',
                  color: '#2d3748'
                }}
                placeholder="Search premium furniture..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                variant="contained"
                onClick={searchProductHandler}
                disabled={loading}
                sx={{
                  px: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '0 12px 12px 0',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                  }
                }}
              >
                <SearchIcon />
              </Button>
            </Box>
          </Box>

          {/* Category Filter Section */}
          <Box sx={{ width: '100%', mb: 3 }}>
            <Typography variant="h5" sx={{ 
              textAlign: 'center', 
              mb: 2, 
              fontWeight: 700,
              color: '#2d3748'
            }}>
              Browse by Category
            </Typography>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap',
              mb: 3
            }}>
              {Object.values(ProductCategory).map((category) => (
                <Button
                  key={category}
                  variant={productSearch.productCategory === category ? "contained" : "outlined"}
                  onClick={() => searchCategoryHandler(category)}
                  disabled={loading}
                  sx={{
                    borderRadius: '25px',
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    minWidth: '120px',
                    ...(productSearch.productCategory === category ? {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    } : {
                      borderColor: '#667eea',
                      color: '#667eea',
                      '&:hover': {
                        background: 'rgba(102, 126, 234, 0.1)',
                        borderColor: '#667eea'
                      }
                    })
                  }}
                >
                  {category}
                </Button>
              ))}
            </Box>

            {/* Sort Filter Section with Enhanced Icons */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap',
              background: '#f8fafc',
              p: 2,
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              <Typography variant="body2" sx={{ 
                alignSelf: 'center',
                color: '#64748b',
                fontWeight: 600,
                mr: 1
              }}>
                Sort by:
              </Typography>
              <Button
                variant={productSearch.order === "createdAt" ? "contained" : "outlined"}
                onClick={() => searchOrderHandler("createdAt")}
                disabled={loading}
                startIcon={<NewReleasesIcon />}
                size="small"
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  ...(productSearch.order === "createdAt" ? {
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white'
                  } : {
                    borderColor: '#10b981',
                    color: '#10b981'
                  })
                }}
              >
                New Arrivals
              </Button>
              <Button
                variant={productSearch.order === "productPrice" ? "contained" : "outlined"}
                onClick={() => searchOrderHandler("productPrice")}
                disabled={loading}
                startIcon={<AttachMoneyIcon />}
                size="small"
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  ...(productSearch.order === "productPrice" ? {
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white'
                  } : {
                    borderColor: '#f59e0b',
                    color: '#f59e0b'
                  })
                }}
              >
                Price Range
              </Button>
              <Button
                variant={productSearch.order === "productViews" ? "contained" : "outlined"}
                onClick={() => searchOrderHandler("productViews")}
                disabled={loading}
                startIcon={<TrendingUpIcon />}
                size="small"
                sx={{
                  borderRadius: '20px',
                  px: 2,
                  py: 0.5,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  ...(productSearch.order === "productViews" ? {
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    color: 'white'
                  } : {
                    borderColor: '#8b5cf6',
                    color: '#8b5cf6'
                  })
                }}
              >
                Most Viewed
              </Button>
            </Box>
          </Box>

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress size={50} sx={{ color: '#667eea' }} />
              <Typography variant="h6" sx={{ ml: 2, color: '#64748b', alignSelf: 'center' }}>
                Loading premium furniture...
              </Typography>
            </Box>
          )}

          {/* Products Grid - Standard Grid Layout */}
          <Grid container spacing={3} sx={{ width: '100%', justifyContent: 'center' }}>
            {!loading && products.length !== 0 ? (
              products.map((product: Product) => (
                <Grid item key={product._id}>
                  <ProductCard
                    product={product}
                    onAdd={onAdd}
                    onProductClick={chosenProductHandler}
                  />
                </Grid>
              ))
            ) : !loading ? (
              <Grid item xs={12}>
                <Box sx={{
                  textAlign: 'center',
                  py: 6,
                  px: 4,
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #f1f5f9'
                }}>
                  <Typography variant="h5" sx={{ mb: 2, color: '#64748b', fontWeight: 600 }}>
                    No Premium Furniture Found
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#94a3b8', mb: 2 }}>
                    We couldn't find any furniture matching your criteria.
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    Try adjusting your search or browse different categories
                  </Typography>
                </Box>
              </Grid>
            ) : null}
          </Grid>

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <Box sx={{ 
              mt: 4,
              background: 'white',
              p: 2,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #f1f5f9'
            }}>
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
                sx={{
                  '& .MuiPaginationItem-root.Mui-selected': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }
                }}
              />
            </Box>
          )}
        </Stack>
      </Container>

      {/* Address Section */}
      <Box sx={{ 
        background: '#f8fafc',
        py: 6,
        mt: 6
      }}>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              color: '#2d3748',
              mb: 3
            }}>
              Visit Our Incheon Showroom
            </Typography>
            <iframe
              style={{ 
                width: '100%',
                height: '400px',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101334.38050977277!2d126.6052076!3d37.4562557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b7b7b7b7b7b7b%3A0x7b7b7b7b7b7b7b7b!2sIncheon%2C%20South%20Korea!5e0!3m2!1sen!2skr!4v1640995200000!5m2!1sen!2skr"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
}
