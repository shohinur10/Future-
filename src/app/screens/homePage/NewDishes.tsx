import React, { useState } from "react";
import { Box, Container, Stack, Typography, Card, CardContent, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Product } from "../../lib/types/product";
import { serverApi } from "../../lib/config";
import { retrieveNewDishes } from "./selector";
import { ProductCategory } from "../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";

/** REDUX SLICE & SELECTOR */
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const defaultFurnitureImages = [
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-5.jpg",
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-6.jpg",
    "/img/RoundSofa_Beige_1024x1024.webp",
    "/img/5-seater-living-room-sofa-set.jpg"
  ];

  const handleLike = async (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const productService = new ProductService();
      await productService.likeProduct(productId);
      
      setLikedProducts(prev => {
        const newLiked = new Set(prev);
        if (newLiked.has(productId)) {
          newLiked.delete(productId);
        } else {
          newLiked.add(productId);
        }
        return newLiked;
      });
    } catch (err) {
      console.log("Error liking product:", err);
    }
  };

  const handleView = async (productId: string) => {
    try {
      const productService = new ProductService();
      await productService.viewProduct(productId);
      navigate(`/products/${productId}`);
    } catch (err) {
      console.log("Error viewing product:", err);
      navigate(`/products/${productId}`);
    }
  };

  // Create placeholder content when no products available
  const featuredProduct = newDishes.length > 0 ? newDishes[0] : null;
  const otherProducts = newDishes.length > 1 ? newDishes.slice(1, 4) : [];

  return (
    <Box sx={{ py: 8, backgroundColor: "#ffffff" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h4" 
            sx={{
              color: '#2d3748',
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              mb: 1
            }}
          >
            New Arrivals
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "#64748b",
              fontSize: "1rem",
              maxWidth: "500px"
            }}
          >
            From modern luxury furniture to sophisticated living spaces, discover our latest premium collection designed for comfort and style.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ height: { xs: 'auto', md: '400px' } }}>
          {/* Featured Large Card */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: '100%',
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: featuredProduct ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: featuredProduct ? 'scale(1.01)' : 'none',
                },
                backgroundImage: `url(${featuredProduct?.productImages?.[0] 
                  ? (featuredProduct.productImages[0].startsWith('/') ? featuredProduct.productImages[0] : `${serverApi}/${featuredProduct.productImages[0]}`)
                  : defaultFurnitureImages[0]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: featuredProduct 
                    ? 'linear-gradient(transparent 40%, rgba(0,0,0,0.3) 100%)'
                    : 'linear-gradient(45deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
                  zIndex: 1
                }
              }}
              onClick={featuredProduct ? () => handleView(featuredProduct._id) : undefined}
            >
              {/* Minimal Content Overlay */}
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                  color: 'white',
                  p: 2.5
                }}
              >
                {featuredProduct ? (
                  <>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'white' }}>
                      {featuredProduct.productName}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0.5 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>
                        ${featuredProduct.productPrice?.toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
                      {featuredProduct.productMaterialType || "Premium Quality"} • New Arrival
                    </Typography>
                  </>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
                      New Arrivals Coming Soon
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 400, mb: 1, color: 'rgba(255,255,255,0.9)' }}>
                      Product is not available
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      We're preparing exciting new furniture pieces for you
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Smaller Cards - Focus on Images */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              {[0, 1, 2].map((index) => {
                const product = otherProducts[index];
                const imagePath = product?.productImages?.[0] 
                  ? (product.productImages[0].startsWith('/') ? product.productImages[0] : `${serverApi}/${product.productImages[0]}`)
                  : defaultFurnitureImages[(index + 1) % defaultFurnitureImages.length];

                return (
                  <Card
                    key={product?._id || `placeholder-${index}`}
                    sx={{
                      flex: 1,
                      position: 'relative',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: product ? 'pointer' : 'default',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: product ? 'scale(1.02)' : 'none',
                      },
                      backgroundImage: `url(${imagePath})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      minHeight: { xs: '180px', md: '120px' },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: product 
                          ? 'linear-gradient(transparent 50%, rgba(0,0,0,0.4) 100%)'
                          : 'linear-gradient(45deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
                        zIndex: 1
                      }
                    }}
                    onClick={product ? () => handleView(product._id) : undefined}
                  >
                    {/* Minimal Content - Just Name and Price */}
                    <CardContent
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        color: 'white',
                        p: 1.5,
                        pb: 1
                      }}
                    >
                      {product ? (
                        <>
                          <Typography variant="body1" sx={{ 
                            fontWeight: 600, 
                            fontSize: '0.9rem',
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {product.productName}
                          </Typography>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 700, 
                            color: '#10b981',
                            fontSize: '1rem'
                          }}>
                            ${product.productPrice?.toLocaleString()}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255,255,255,0.8)',
                          textAlign: 'center',
                          fontSize: '0.8rem'
                        }}>
                          Coming Soon
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}