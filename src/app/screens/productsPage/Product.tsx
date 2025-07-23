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
  
  const imagePath = imageError ? 
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)] : 
    `${serverApi}/${product.productImages[0]}`;
  
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
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        background: 'white',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        }
      }}
      onClick={() => onProductClick(product._id)}
    >
      {/* Top - Large Image Section (75% of card height) */}
      <Box sx={{ 
        position: 'relative',
        height: '280px', // Increased for better image display
        width: '100%',
        overflow: 'hidden'
      }}>
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          image={imagePath}
          alt={product.productName}
          onError={handleImageError}
        />
        
        {/* Premium Material Badge */}
        <Chip
          label={product.productMaterialType || "Premium"}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 700,
            zIndex: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        />
        
        {/* Views Badge */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            background: 'rgba(0, 0, 0, 0.75)',
            color: 'white',
            borderRadius: '20px',
            px: 1.5,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: '0.8rem',
            fontWeight: 600,
            backdropFilter: 'blur(10px)'
          }}
        >
          <RemoveRedEyeIcon sx={{ fontSize: '1rem' }} />
          {product.productViews || 0}
        </Box>
      </Box>

      {/* Bottom - Content Section (40% of card height) */}
      <CardContent sx={{ 
        flex: 1,
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        '&:last-child': { pb: 2 }
      }}>
        {/* Product Title and Category */}
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            color: '#2d3748',
            fontSize: '1rem',
            lineHeight: 1.3,
            mb: 0.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': 1,
            '-webkit-box-orient': 'vertical'
          }}>
            {product.productName}
          </Typography>
          
          <Chip 
            label={product.productCategory || "Furniture"}
            size="small"
            variant="outlined"
            sx={{ 
              fontSize: '0.7rem',
              height: '24px',
              borderColor: '#e2e8f0',
              color: '#64748b',
              fontWeight: 500
            }}
          />
        </Box>

        {/* Bottom Section - Price, Quantity, Button */}
        <Box onClick={(e) => e.stopPropagation()}>
          {/* Price Display */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
            borderRadius: '8px',
            p: 1,
            mb: 1
          }}>
            <AttachMoneyIcon sx={{ fontSize: '1.2rem', color: '#667eea', mr: 0.5 }} />
            <Typography variant="h6" sx={{ 
              fontWeight: 700,
              color: '#2d3748',
              fontSize: '1.2rem'
            }}>
              {product.productPrice.toLocaleString()}
            </Typography>
          </Box>
          
          {/* Quantity Controls */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 1,
            mb: 1
          }}>
            <Button 
              size="small"
              onClick={(e) => handleQuantityChange(-1, e)}
              disabled={quantity <= 1}
              sx={{ 
                minWidth: '36px',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                color: '#667eea',
                fontWeight: 700,
                fontSize: '1.2rem',
                '&:hover': {
                  background: '#667eea',
                  color: 'white',
                  borderColor: '#667eea'
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }
              }}
            >
              -
            </Button>
            <Typography sx={{ 
              fontWeight: 700,
              fontSize: '1.1rem',
              minWidth: '32px',
              textAlign: 'center',
              color: '#2d3748',
              px: 1,
              py: 0.5,
              background: '#f8fafc',
              borderRadius: '6px',
              border: '1px solid #e2e8f0'
            }}>
              {quantity}
            </Typography>
            <Button 
              size="small"
              onClick={(e) => handleQuantityChange(1, e)}
              disabled={quantity >= 10}
              sx={{ 
                minWidth: '36px',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                color: '#667eea',
                fontWeight: 700,
                fontSize: '1.1rem',
                '&:hover': {
                  background: '#667eea',
                  color: 'white',
                  borderColor: '#667eea'
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed'
                }
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
            startIcon={isAdding ? <CircularProgress size={16} color="inherit" /> : <ShoppingCartIcon />}
            sx={{
              width: '100%',
              py: 1,
              fontSize: '0.9rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              },
              '&:disabled': {
                opacity: 0.7,
                cursor: 'not-allowed',
                transform: 'none'
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
              Visit Our Premium Showroom
            </Typography>
            <iframe
              style={{ 
                width: '100%',
                height: '400px',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
}
