import React, { useEffect } from "react";
import { Container, Stack, Box, Typography, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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

// Enhanced Slider Image Component
const SliderImage: React.FC<{
  src: string;
  alt: string;
  index: number;
}> = ({ src, alt, index }) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(src);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    if (!error && imageSrc !== "/img/default-furniture.svg") {
      setImageSrc("/img/default-furniture.svg");
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      width: '100%', 
      height: '600px'
    }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '50%',
            padding: '1rem'
          }}
        >
          <CircularProgress size={40} sx={{ color: '#667eea' }} />
        </Box>
      )}
      <img
        src={imageSrc}
        alt={alt}
        style={{
          width: '100%',
          height: '600px',
          objectFit: 'cover',
          display: 'block',
          opacity: loading ? 0.3 : 1,
          transition: 'opacity 0.3s ease-in-out',
          background: '#f8fafc'
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]); // Removed setChosenProduct and setFounder to prevent infinite loop

  if (loading) {
    return (
      <div className={"chosen-product"}>
        <Container>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 2
          }}>
            <CircularProgress size={60} sx={{ color: '#667eea' }} />
            <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500 }}>
              Loading product details...
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }

  if (!chosenProduct) {
    return (
      <div className={"chosen-product"}>
        <Container>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 2
          }}>
            <Typography variant="h5" sx={{ color: '#64748b', fontWeight: 600 }}>
              Product not found
            </Typography>
            <Typography variant="body1" sx={{ color: '#94a3b8' }}>
              The product you're looking for doesn't exist or has been removed.
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Details</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={chosenProduct?.productImages.length > 1}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
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
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            
            {founder && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                  Sold by
                </Typography>
            <span className={"founder-name"}>{founder?.memberNick}</span>
                <span className={"founder-name"}>📞 {founder?.memberPhone}</span>
              </Box>
            )}
            
            <Box className={"rating-box"}>
              <Rating 
                name="product-rating" 
                defaultValue={4.5} 
                precision={0.5} 
                sx={{
                  '& .MuiRating-iconFilled': {
                    color: '#667eea',
                  },
                  '& .MuiRating-iconEmpty': {
                    color: '#e2e8f0',
                  },
                }}
              />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px", fontSize: '1.1rem' }} />
                  <span>{chosenProduct?.productViews?.toLocaleString() || 0} views</span>
                </div>
              </div>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              flexWrap: 'wrap',
              mb: 1 
            }}>
              <Box sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                {chosenProduct?.productMaterialType}
              </Box>
              <Box sx={{ 
                background: '#f8fafc',
                color: '#64748b',
                px: 1.5,
                py: 0.5,
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid #e2e8f0'
              }}>
                {chosenProduct?.productCategory}
              </Box>
            </Box>
            
            <Typography className={"product-desc"}>
              {chosenProduct?.productDesc || "This premium furniture piece combines style and functionality, crafted with attention to detail and quality materials. Perfect for modern homes seeking elegance and durability."}
            </Typography>
            
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice?.toLocaleString()}</span>
            </div>
            
            <div className={"button-box"}>
              <Button
                variant="contained"
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
                sx={{ mb: 1 }}
              >
                Add To Cart
              </Button>
              
              <Typography variant="body2" sx={{ 
                textAlign: 'center', 
                color: '#64748b',
                fontSize: '0.85rem',
                mt: 1
              }}>
                ✓ Free shipping on orders over $500
              </Typography>
              <Typography variant="body2" sx={{ 
                textAlign: 'center', 
                color: '#64748b',
                fontSize: '0.85rem'
              }}>
                ✓ 30-day return guarantee
              </Typography>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
