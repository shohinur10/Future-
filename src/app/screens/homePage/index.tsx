import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { retrievePopularDishes, retrieveNewDishes, retrieveTopUsers } from "./selector";
import { Container, Box, Typography, Button, Stack, Grid, Card, CardMedia, CardContent } from "@mui/material";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import ActiveUsers from "./ActiveUsers";
import { useNavigate } from "react-router-dom";
import "../../../css/home.css";
import { AppDispatch } from "../../../store";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const product = new ProductService();

    // 🔥 Popular Products (Best Selling) - ALL categories
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        search: "",
      })
      .then((data: any) => dispatch(setPopularDishes(data)))
      .catch((err: any) => console.log("Popular products error:", err));

    // 🔥 NEW ARRIVALS - ALL categories
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
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

      {/* New Arrivals Products Section - Database Driven */}
      <Box sx={{ py: 8, backgroundColor: "#ffffff" }}>
        <NewDishes />
      </Box>

      {/* View Best Selling Section - Database Driven */}
      <Box sx={{ py: 8, backgroundColor: "#ffffff" }}>
        <PopularDishes />
      </Box>

      {/* Active Users */}
      <div className="active-users-frame">
        <ActiveUsers />
      </div>
    </div>
  );
}

