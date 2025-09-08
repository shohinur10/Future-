import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import { Typography as JoyTypography } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { serverApi } from "../../lib/config";
import { retrieveTopUsers } from "./selector";
import { Member } from "../../lib/types/member";

/** REDUX SLICE & SELECTOR */
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-section-header">
            <Typography 
              variant="h3" 
              className="category-title"
              sx={{
                background: "linear-gradient(45deg, #2ecc71, #27ae60)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 1
              }}
            >
              ⭐ Our Top Customers
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
              Meet our valued customers who trust Future Furniture for their dream spaces
            </Typography>
          </Box>
          <Stack className="cards-frame">
              {topUsers.length !== 0 ? (
                topUsers.map((member: Member) => {
                  return (
                  <CssVarsProvider key={member._id}>
                    <Card className="featured-card">
                      <CardCover>
                        <img 
                          src={member.memberImage?.startsWith('/') ? member.memberImage : `${serverApi}/${member.memberImage}`} 
                          alt={member.memberNick}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/icons/default-user.svg";
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
                          {member.memberNick}
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
                              textColor="#2ecc71"
                              sx={{ fontWeight: 700 }}
                            >
                              VIP
                            </JoyTypography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={2} mt={1}>
                          <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
                            <PersonIcon sx={{ fontSize: "16px", mr: 0.5 }} />
                            <JoyTypography level="body-sm" textColor="inherit">
                              Customer
                            </JoyTypography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
                            <StarIcon sx={{ fontSize: "16px", mr: 0.5 }} />
                            <JoyTypography level="body-sm" textColor="inherit">
                              Top Rated
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
                  🌟 Amazing Customers Coming Soon!
                </Typography>
              </Box>
              )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}