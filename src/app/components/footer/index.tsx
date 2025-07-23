import React from "react";
import { Box, Container, Stack, Typography, Grid, Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ModernFooter = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1.5" fill="rgba(255,255,255,0.08)"/></pattern></defs><rect width="60" height="60" fill="url(%23dots)"/></svg>');
    pointer-events: none;
  }
`;

const FooterSection = styled(Box)`
  position: relative;
  z-index: 2;
  padding: 4rem 0 2rem 0;
`;

const SectionTitle = styled(Typography)`
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  margin-bottom: 1.5rem !important;
  color: white !important;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  line-height: 2.2;
  transition: all 0.3s ease;
  display: block;
  
  &:hover {
    color: white;
    transform: translateX(8px);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const ContactItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  
  .MuiSvgIcon-root {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    padding: 8px;
    font-size: 1.2rem;
  }
`;

const SocialButton = styled(IconButton)`
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  margin: 0 8px 8px 0 !important;
  border-radius: 12px !important;
  width: 48px !important;
  height: 48px !important;
  transition: all 0.3s ease !important;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: translateY(-4px) scale(1.1) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2) !important;
  }
`;

const NewsletterBox = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 1rem;
`;

const CopyrightSection = styled(Box)`
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 0;
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
`;

export default function Footer() {
  const authMember = null;

  return (
    <ModernFooter>
      <Container maxWidth="lg">
        <FooterSection>
          <Grid container spacing={4}>
            {/* Company Info Section */}
            <Grid item xs={12} md={4}>
              <SectionTitle>Future Furniture</SectionTitle>
              <Typography sx={{ 
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.7,
                fontSize: '0.95rem',
                mb: 3
              }}>
                Creating the future of living spaces with innovative design and premium quality. 
                We transform houses into homes with furniture that combines style, comfort, and functionality.
              </Typography>
              
              <NewsletterBox>
                <Typography variant="h6" sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  mb: 1,
                  fontSize: '1.1rem'
                }}>
                  Stay Updated
                </Typography>
                <Typography sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem'
                }}>
                  Get the latest furniture trends and exclusive offers delivered to your inbox.
                </Typography>
              </NewsletterBox>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <SectionTitle>Quick Links</SectionTitle>
              <Stack>
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/products">Products</FooterLink>
                {authMember && <FooterLink to="/orders">My Orders</FooterLink>}
                {authMember && <FooterLink to="/member-page">My Profile</FooterLink>}
                <FooterLink to="/help">Help Center</FooterLink>
              </Stack>
            </Grid>

            {/* Product Categories */}
            <Grid item xs={12} sm={6} md={2}>
              <SectionTitle>Categories</SectionTitle>
              <Stack>
                <FooterLink to="/products?category=bedroom">Bedroom</FooterLink>
                <FooterLink to="/products?category=office">Office</FooterLink>
                <FooterLink to="/products?category=kitchen">Kitchen</FooterLink>
                <FooterLink to="/products?category=outdoor">Outdoor</FooterLink>
                <FooterLink to="/products?category=kids">Kids</FooterLink>
              </Stack>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <SectionTitle>Get In Touch</SectionTitle>
              
              <ContactItem>
                <LocationOnIcon />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                    Visit Our Showroom
                  </Typography>
                  <Typography variant="body2">
                    Metropolitan, Incheon, South Korea
                  </Typography>
                </Box>
              </ContactItem>

              <ContactItem>
                <PhoneIcon />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                    Call Us Today
                  </Typography>
                  <Typography variant="body2">
                    +82 10 5555 5555
                  </Typography>
                </Box>
              </ContactItem>

              <ContactItem>
                <EmailIcon />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                    Email Support
                  </Typography>
                  <Typography variant="body2">
                    support@futurefurniture.com
                  </Typography>
                </Box>
              </ContactItem>

              <ContactItem>
                <AccessTimeIcon />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                    Business Hours
                  </Typography>
                  <Typography variant="body2">
                    Mon - Sun: 9:00 AM - 9:00 PM
                  </Typography>
                </Box>
              </ContactItem>

              {/* Social Media */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  mb: 1.5,
                  fontSize: '1rem'
                }}>
                  Follow Us
                </Typography>
                <Box>
                  <SocialButton>
                    <FacebookIcon />
                  </SocialButton>
                  <SocialButton>
                    <TwitterIcon />
                  </SocialButton>
                  <SocialButton>
                    <InstagramIcon />
                  </SocialButton>
                  <SocialButton>
                    <YouTubeIcon />
                  </SocialButton>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ 
            my: 3, 
            borderColor: 'rgba(255, 255, 255, 0.2)',
            width: '100%'
          }} />

          {/* Additional Links */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={8}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <FooterLink to="/privacy" style={{ fontSize: '0.85rem' }}>
                  Privacy Policy
                </FooterLink>
                <FooterLink to="/terms" style={{ fontSize: '0.85rem' }}>
                  Terms of Service
                </FooterLink>
                <FooterLink to="/shipping" style={{ fontSize: '0.85rem' }}>
                  Shipping Info
                </FooterLink>
                <FooterLink to="/returns" style={{ fontSize: '0.85rem' }}>
                  Returns & Exchanges
                </FooterLink>
                <FooterLink to="/warranty" style={{ fontSize: '0.85rem' }}>
                  Warranty
                </FooterLink>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.85rem',
                textAlign: { xs: 'left', md: 'right' }
              }}>
                Trusted by 10,000+ happy customers
              </Typography>
            </Grid>
          </Grid>
        </FooterSection>
      </Container>

      <CopyrightSection>
        <Container maxWidth="lg">
          <Typography>
            © 2024 Future Furniture. All rights reserved. | Crafting tomorrow's living spaces today.
          </Typography>
        </Container>
      </CopyrightSection>
    </ModernFooter>
  );
}
