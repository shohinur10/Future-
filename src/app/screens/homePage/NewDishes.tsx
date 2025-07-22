import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import { Typography as JoyTypography } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Product } from "../../lib/types/product";
import { serverApi } from "../../lib/config";
import { retrieveNewDishes } from "./selector";
import { ProductCategory } from "../../lib/enums/product.enum";

/** REDUX SLICE & SELECTOR */
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);

  const defaultFurnitureImages = [
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-5.jpg",
    "/img/Living-Room-and-Single-Sofas-Modern-Exclusive-Fierce-Comfortable-6.jpg",
    "/img/RoundSofa_Beige_1024x1024.webp",
    "/img/5-seater-living-room-sofa-set.jpg"
  ];

  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-section-header">
            <Typography 
              variant="h3" 
              className="category-title"
              sx={{
                background: "linear-gradient(45deg, #3498db, #2980b9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 1
              }}
            >
              🆕 New Arrivals
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                textAlign: "center", 
                color: "#7f8c8d", 
                mb: 4,
                maxWidth: "600px",
                mx: "auto"
              }}
            >
              Fresh designs and latest trends in modern furniture - be the first to own them!
            </Typography>
          </Box>
          <Stack className="cards-frame">
              {newDishes.length !== 0 ? (
              newDishes.map((product: Product, index: number) => {
                const imagePath = product.productImages?.[0] 
                  ? `${serverApi}/${product.productImages[0]}`
                  : defaultFurnitureImages[index % defaultFurnitureImages.length];
                
                const categoryLabel = product.productCategory === ProductCategory.BEDROOM
                  ? product.productMaterialType || "Quality Material"
                  : product.productStyleType || "Modern Style";
                
                  return (
                  <CssVarsProvider key={product._id}>
                    <Card className="featured-card">
                      <CardCover>
                        <img 
                          src={imagePath} 
                          alt={product.productName}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultFurnitureImages[index % defaultFurnitureImages.length];
                          }}
                        />
                      </CardCover>
                      <CardCover className="card-overlay" />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <JoyTypography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                            sx={{ fontWeight: 600 }}
                          >
                              {product.productName}
                          </JoyTypography>
                          <Box
                            sx={{
                              backgroundColor: "rgba(255,255,255,0.9)",
                              borderRadius: "20px",
                              padding: "8px 16px",
                              backdropFilter: "blur(10px)"
                            }}
                          >
                            <JoyTypography
                              level="h3"
                              fontSize="lg"
                              textColor="#3498db"
                              sx={{ fontWeight: 700 }}
                            >
                              ${product.productPrice}
                            </JoyTypography>
                          </Box>
                          </Stack>
                        <Stack direction="row" spacing={2} mt={1}>
                          <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
                            <VisibilityIcon sx={{ fontSize: "16px", mr: 0.5 }} />
                            <JoyTypography level="body-sm" textColor="inherit">
                              {product.productViews}
                            </JoyTypography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
                            <DescriptionOutlinedIcon sx={{ fontSize: "16px", mr: 0.5 }} />
                            <JoyTypography level="body-sm" textColor="inherit">
                              {categoryLabel}
                            </JoyTypography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </CssVarsProvider>
                  );
                })
              ) : (
              <Box className="no-data">
                <Typography variant="h5" color="textSecondary">
                  🔄 New Arrivals Loading Soon...
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}