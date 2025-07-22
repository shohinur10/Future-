import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { retrievePopularDishes, retrieveNewDishes, retrieveTopUsers } from "./selector";
import { Container, Box, Typography, Button, Stack, Grid, Card, CardMedia, CardContent } from "@mui/material";
import PopularDishes from "./PopularDishes";
import ActiveUsers from "./ActiveUsers";
import { useNavigate } from "react-router-dom";
import "../../../css/home.css";
import { AppDispatch } from "../../../store";
import { ProductCategory } from "../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const product = new ProductService();

    // 🔥 Popular Products
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCategory: ProductCategory.BEDROOM,
        search: "",
      })
      .then((data: any) => dispatch(setPopularDishes(data)))
      .catch((err: any) => console.log("Popular products error:", err));

    // 🔥 NEW ARRIVALS
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCategory: ProductCategory.BEDROOM,
        search: "",
      })
      .then((data: any) => dispatch(setNewDishes(data)))
      .catch((err: any) => console.log("New products error:", err));

    // 🔥 Top Users
    const member = new MemberService();
    member
      .getTopUsers()
      .then((data: any) => dispatch(setTopUsers(data)))
      .catch((err: any) => console.log("Top users error:", err));
  }, [dispatch]);

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <div className="homepage">
      {/* Hero Section - Hotel Style Welcome */}
      <Box className="hero-welcome-section">
        <Box 
          component="img"
          src="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-1.jpg"
          alt="Luxury Furniture"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        <Box className="hero-background-image" />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ 
            textAlign: "center", 
            py: { xs: 8, md: 12 },
            color: "white"
          }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: "3rem", md: "4.5rem", lg: "5.5rem" },
                fontWeight: 300,
                mb: 2,
                letterSpacing: "2px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              Welcome to
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: "2rem", md: "3rem", lg: "3.5rem" },
                fontWeight: 700,
                mb: 4,
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              Future Furniture
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: { xs: "1rem", md: "1.2rem" },
                fontWeight: 300,
                mb: 4,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
              }}
            >
              Experience luxury and comfort with our quality furniture collection. 
              Transform your space into a sanctuary of style and elegance.
            </Typography>

            {/* You Deserve the Best Quality Message */}
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 600,
                mb: 6,
                color: "#f39c12",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                letterSpacing: "1px"
              }}
            >
              ✨ You Deserve The Best Quality ✨
            </Typography>

            {/* CTA Buttons */}
            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              spacing={3} 
              justifyContent="center"
              sx={{ mb: 8 }}
            >
              <Button 
                variant="contained" 
                size="large"
                onClick={handleShopNow}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#2c3e50",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "30px",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    backgroundColor: "white",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Explore Collection
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => navigate("/help")}
                sx={{
                  borderColor: "rgba(255,255,255,0.8)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: "30px",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Get Consultation
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Signature Collection Section */}
      <Box sx={{ py: 10, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 600,
                color: "#2c3e50",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.5rem" }
              }}
            >
              Explore our
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: "#2c3e50",
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" }
              }}
            >
              signature collections
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#7f8c8d",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6
              }}
            >
              Discover our handcrafted furniture pieces designed to elevate your living spaces with timeless elegance and modern sophistication.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card 
                sx={{ 
                  height: 400,
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }
                }}
                onClick={() => navigate("/products")}
              >
            
                <CardMedia
                  component="img"
                  height="400"
                  image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-1.jpg"
                  alt="Luxury Living Room"
                  sx={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
                    display: "flex",
                    alignItems: "flex-end",
                    p: 4
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 600, mb: 1 }}>
                      Living Sets Collection
                    </Typography>
                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                      Starting from $2,999
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={3} height="100%">
                <Card 
                  sx={{ 
                    flex: 1,
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }
                  }}
                  onClick={() => navigate("/products")}
                >
                  <CardMedia
                    component="img"
                    height="188"
                    image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-2.jpg"
                    alt="Bedroom Collection"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                      Bedroom Collection
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 1 }}>
                      From $1,299
                    </Typography>
                  </CardContent>
                </Card>
                <Card 
                  sx={{ 
                    flex: 1,
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }
                  }}
                  onClick={() => navigate("/products")}
                >
                  <CardMedia
                    component="img"
                    height="188"
                    image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-3.jpg"
                    alt="Office Furniture"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                      Office Collection
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 1 }}>
                      From $899
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Collections Section */}
      <Box sx={{ py: 8, backgroundColor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 600,
                color: "#2c3e50",
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" }
              }}
            >
              Discover Our Collections
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#666",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6
              }}
            >
              Explore our carefully curated furniture collections designed for modern living spaces.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card 
                sx={{ 
                  height: 400,
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }
                }}
                onClick={() => navigate("/products")}
              >
            
                <CardMedia
                  component="img"
                  height="400"
                  image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-1.jpg"
                  alt="Luxury Living Room"
                  sx={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1))",
                    display: "flex",
                    alignItems: "flex-end",
                    p: 4
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 600, mb: 1 }}>
                      Living Sets Collection
                    </Typography>
                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                      Starting from $2,999
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={3} height="100%">
                <Card 
                  sx={{ 
                    flex: 1,
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }
                  }}
                  onClick={() => navigate("/products")}
                >
                  <CardMedia
                    component="img"
                    height="188"
                    image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-2.jpg"
                    alt="Bedroom Collection"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                      Bedroom Collection
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 1 }}>
                      From $1,299
                    </Typography>
                  </CardContent>
                </Card>
                <Card 
                  sx={{ 
                    flex: 1,
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }
                  }}
                  onClick={() => navigate("/products")}
                >
                  <CardMedia
                    component="img"
                    height="188"
                    image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-3.jpg"
                    alt="Office Furniture"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                      Office Collection
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 1 }}>
                      From $899
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Explore Our Signature Collection Section */}
      <Box sx={{ py: 8, backgroundColor: "#ffffff" }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 600,
                color: "#2c3e50",
                mb: 3,
                fontSize: { xs: "2rem", md: "2.5rem" }
              }}
            >
              Explore Our Signature Collection
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#666",
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6
              }}
            >
              Discover our exclusive signature pieces crafted with exceptional attention to detail and timeless design.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card 
                sx={{ 
                  height: 400,
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }
                }}
                onClick={() => navigate("/products")}
              >
            
                <CardMedia
                  component="img"
                  height="400"
                  image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-4.jpg"
                  alt="Signature Sofas"
                  sx={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.3))",
                    display: "flex",
                    alignItems: "flex-end",
                    p: 4
                  }}
                >
                  <Box>
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 600, mb: 1 }}>
                      Signature Sofas
                    </Typography>
                    <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)" }}>
                      Starting from $2,499
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={3} height="100%">
                <Card 
                  sx={{ 
                    flex: 1,
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }
                  }}
                  onClick={() => navigate("/products")}
                >
                  <CardMedia
                    component="img"
                    height="188"
                    image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-5.jpg"
                    alt="Signature Dining"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                      Signature Dining
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 1 }}>
                      From $1,599
                    </Typography>
                  </CardContent>
                </Card>
                <Card 
                  sx={{ 
                    flex: 1,
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                    }
                  }}
                  onClick={() => navigate("/products")}
                >
                  <CardMedia
                    component="img"
                    height="188"
                    image="/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-6.jpg"
                    alt="Signature Accents"
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#2c3e50" }}>
                      Signature Accents
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7f8c8d", mt: 1 }}>
                      From $399
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Active Users */}
      <div className="active-users-frame">
      <ActiveUsers />
      </div>
    </div>
  );
}

