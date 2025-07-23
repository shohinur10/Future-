import React, { useEffect } from "react";
import { 
  Container, 
  Stack, 
  Box, 
  Typography, 
  CircularProgress, 
  Chip,
  Card,
  CardContent,
  Grid,
  Divider,
  Badge
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setFounder } from "./slice";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveFounder} from "./selector";
import { Product } from "../../lib/types/product";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../lib/types/member";
import { serverApi } from "../../lib/config";
import { CartItem } from "../../lib/types/search";

// Enhanced Slider Image Component with better fallback handling
const SliderImage: React.FC<{
  src: string;
  alt: string;
  index: number;
}> = ({ src, alt, index }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(src);

  const fallbackImages = [
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-1.jpg",
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-2.jpg",
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-3.jpg",
    "/img/5-seater-living-room-sofa-set.jpg",
    "/img/RoundSofa_Beige_1024x1024.webp",
    "/img/ai-generated-vintage-leather-tufted-sofa-free-png.png"
  ];

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    if (!error) {
      const fallback = fallbackImages[index % fallbackImages.length];
      setImageSrc(fallback);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '500px',
      borderRadius: '16px',
      overflow: 'hidden',
      background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
    }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '50%',
            padding: '1.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          <CircularProgress size={50} sx={{ color: '#667eea' }} />
        </Box>
      )}
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '500px',
          objectFit: 'cover',
          display: 'block',
          opacity: loading ? 0.3 : 1,
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease',
          borderRadius: '16px',
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Premium badge overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          color: '#1a202c',
          px: 2,
          py: 0.5,
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)',
          zIndex: 3
        }}
      >
        Premium Quality
      </Box>
    </Box>
  );
};

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setFounder: (data: Member) => dispatch(setFounder(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const founderRetriever = createSelector(
  retrieveFounder,
  (founder) => ({
    founder,
  })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setFounder, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { founder } = useSelector(founderRetriever);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    if (!productId) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const product = new ProductService();
        const productData = await product.getProduct(productId);
        if (productData) {
          setChosenProduct(productData);
        }

        const member = new MemberService();
        const founderData = await member.getFounder();
        setFounder(founderData);
      } catch (err) {
        console.log("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <div className={"chosen-product"}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 3
          }}>
            <CircularProgress size={80} sx={{ color: '#667eea' }} />
            <Typography variant="h6" sx={{ 
              color: '#64748b', 
              fontWeight: 600,
              textAlign: 'center'
            }}>
              Loading premium furniture details...
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }

  if (!chosenProduct) {
    return (
      <div className={"chosen-product"}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 3,
            textAlign: 'center'
          }}>
            <Typography variant="h4" sx={{ 
              color: '#2d3748', 
              fontWeight: 700,
              mb: 1
            }}>
              Product Not Found
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#64748b',
              fontSize: '1.1rem',
              maxWidth: '500px'
            }}>
              The furniture piece you're looking for doesn't exist or has been removed from our catalog.
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <div className={"chosen-product"}>
      {/* Hero Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 4,
        mb: 4
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Premium Furniture Details
          </Typography>
          <Typography variant="subtitle1" sx={{ 
            textAlign: 'center', 
            opacity: 0.9, 
            mt: 1,
            fontSize: '1.1rem'
          }}>
            Crafted with excellence, designed for your comfort
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              overflow: 'hidden',
              background: 'white'
            }}>
              <Box sx={{ p: 2 }}>
                <Swiper
                  loop={chosenProduct?.productImages?.length > 1}
                  spaceBetween={10}
                  navigation={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="swiper-area"
                  style={{ borderRadius: '16px' }}
                >
                  {chosenProduct?.productImages?.map((ele: string, index: number) => {
                    const imagePath = `${serverApi}/${ele}`;
                    
                    return (
                      <SwiperSlide key={`${productId}-${index}`}>
                        <SliderImage
                          src={imagePath}
                          alt={`${chosenProduct.productName} - Image ${index + 1}`}
                          index={index}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Box>
            </Card>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              
              {/* Product Header */}
              <Card sx={{ 
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                mb: 3,
                overflow: 'hidden'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700,
                    color: '#2d3748',
                    mb: 2,
                    lineHeight: 1.2
                  }}>
                    {chosenProduct?.productName}
                  </Typography>

                  {/* Seller Info */}
                  {founder && (
                    <Box sx={{ 
                      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                      borderRadius: '12px',
                      p: 2,
                      mb: 2
                    }}>
                      <Typography variant="body2" sx={{ 
                        color: '#64748b', 
                        fontSize: '0.85rem',
                        mb: 0.5,
                        fontWeight: 500
                      }}>
                        Premium Seller
                      </Typography>
                      <Typography variant="h6" sx={{ 
                        color: '#2d3748',
                        fontWeight: 600,
                        mb: 1
                      }}>
                        {founder?.memberNick}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: '1rem', color: '#667eea' }} />
                        <Typography sx={{ color: '#4a5568', fontWeight: 500 }}>
                          {founder?.memberPhone}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {/* Rating & Views */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    mb: 2
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating 
                        value={4.8} 
                        precision={0.1} 
                        readOnly
                        size="small"
                        sx={{
                          '& .MuiRating-iconFilled': { color: '#ffd700' },
                          '& .MuiRating-iconEmpty': { color: '#e2e8f0' },
                        }}
                      />
                      <Typography sx={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
                        4.8
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <RemoveRedEyeIcon sx={{ fontSize: '1rem', color: '#64748b' }} />
                      <Typography sx={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                        {chosenProduct?.productViews?.toLocaleString() || '1,247'} views
                      </Typography>
                    </Box>
                  </Box>

                  {/* Category Tags */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip 
                      label={chosenProduct?.productMaterialType || "Premium Material"}
                      sx={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}
                    />
                    <Chip 
                      label={chosenProduct?.productCategory || "Living Room"}
                      variant="outlined"
                      sx={{ 
                        borderColor: '#667eea',
                        color: '#667eea',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}
                    />
                  </Box>

                  {/* Description */}
                  <Typography sx={{ 
                    color: '#4a5568',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    mb: 3,
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    p: 2,
                    borderRadius: '12px',
                    borderLeft: '4px solid #667eea'
                  }}>
                    {chosenProduct?.productDesc || "Experience the perfect blend of modern design and exceptional comfort with this premium furniture piece. Crafted from the finest materials with meticulous attention to detail, this piece will transform your living space into a haven of style and sophistication."}
                  </Typography>

                  {/* Price & Purchase */}
                  <Box sx={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '16px',
                    p: 3,
                    color: 'white',
                    mb: 3
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 2
                    }}>
                      <Typography variant="h6" sx={{ 
                        opacity: 0.9,
                        fontWeight: 500
                      }}>
                        Premium Price
                      </Typography>
                      <Typography variant="h3" sx={{ 
                        fontWeight: 700,
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        ${chosenProduct?.productPrice?.toLocaleString() || '999'}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCartIcon />}
                      onClick={(e) => {
                        onAdd({
                          _id: chosenProduct._id,
                          quantity: 1,
                          name: chosenProduct.productName,
                          price: chosenProduct.productPrice,
                          image: chosenProduct.productImages[0],
                        });
                        e.stopPropagation();
                      }}
                      sx={{ 
                        width: '100%',
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        textTransform: 'none',
                        borderRadius: '12px',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.3)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                        }
                      }}
                    >
                      Add to Premium Cart
                    </Button>
                  </Box>

                  {/* Trust Badges */}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <LocalShippingIcon sx={{ fontSize: '2rem', color: '#667eea', mb: 1 }} />
                        <Typography variant="caption" sx={{ 
                          display: 'block', 
                          color: '#64748b',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}>
                          Free Shipping
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <SecurityIcon sx={{ fontSize: '2rem', color: '#667eea', mb: 1 }} />
                        <Typography variant="caption" sx={{ 
                          display: 'block', 
                          color: '#64748b',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}>
                          30-Day Return
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center', p: 1 }}>
                        <ThumbUpIcon sx={{ fontSize: '2rem', color: '#667eea', mb: 1 }} />
                        <Typography variant="caption" sx={{ 
                          display: 'block', 
                          color: '#64748b',
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}>
                          Quality Guarantee
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
