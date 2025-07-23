import React from "react";
import {
  Box,
  Container,
  Stack,
  Tabs,
  Card,
  CardContent,
  Grid,
  Chip,
  Paper
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import GavelIcon from "@mui/icons-material/Gavel";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import "../../../css/help.css";
import { faq } from "../../lib/data/faq";
import { terms } from "../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help-page">
      {/* Hero Section */}
      <Box className="help-hero">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="h2" className="hero-title">
              Support Center
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" className="help-container">
        <TabContext value={value}>
          {/* Tab Navigation */}
          <Paper className="tab-navigation" elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              className="modern-tabs"
            >
              <Tab
                icon={<GavelIcon />}
                label="Terms & Conditions"
                value="1"
                className="tab-item"
              />
              <Tab
                icon={<HelpOutlineIcon />}
                label="FAQ"
                value="2"
                className="tab-item"
              />
              <Tab
                icon={<ContactSupportIcon />}
                label="Contact Us"
                value="3"
                className="tab-item"
              />
            </Tabs>
          </Paper>

          {/* Tab Panels */}
          <Box className="tab-content">
            {/* Terms Panel */}
            <TabPanel value="1" className="tab-panel">
              <Card className="content-card">
                <CardContent>
                  <Box className="section-header">
                    <GavelIcon className="section-icon" />
                    <Typography variant="h4" className="section-title">
                      Terms & Conditions
                    </Typography>
                    <Typography variant="body1" className="section-subtitle">
                      Please read our terms and conditions carefully
                    </Typography>
                  </Box>

                  <Box className="terms-content">
                    {terms.map((term, index) => (
                      <Box key={index} className="term-item">
                        <Chip
                          label={`${index + 1}`}
                          size="small"
                          className="term-number"
                        />
                        <Typography variant="body1" className="term-text">
                          {term}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* FAQ Panel */}
            <TabPanel value="2" className="tab-panel">
              <Card className="content-card">
                <CardContent>
                  <Box className="section-header">
                    <HelpOutlineIcon className="section-icon" />
                    <Typography variant="h4" className="section-title">
                      Frequently Asked Questions
                    </Typography>
                    <Typography variant="body1" className="section-subtitle">
                      Find quick answers to the most common questions about our furniture and services
                    </Typography>
                  </Box>
                  
                  <Box className="faq-content">
                    {/* Shopping & Orders Section */}
                    <Typography variant="h6" className="faq-section-title">
                      Shopping & Orders
                    </Typography>
                    <Typography variant="body2" className="faq-section-desc">
                      Everything you need to know about placing orders and shopping with us
                    </Typography>
                    
                    {faq.slice(0, 3).map((item, index) => (
                      <Accordion key={index} className="faq-accordion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          className="faq-question"
                        >
                          <Typography variant="h6" className="question-text">
                            {item.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                          <Typography variant="body1" className="answer-text">
                            {item.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}

                    {/* Policies & Support Section */}
                    <Typography variant="h6" className="faq-section-title">
                      Policies & Customer Support
                    </Typography>
                    <Typography variant="body2" className="faq-section-desc">
                      Learn about our return policies, warranties, and how we protect your information
                    </Typography>
                    
                    {faq.slice(3, 8).map((item, index) => (
                      <Accordion key={index + 3} className="faq-accordion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          className="faq-question"
                        >
                          <Typography variant="h6" className="question-text">
                            {item.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                          <Typography variant="body1" className="answer-text">
                            {item.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}

                    {/* Product & Services Section */}
                    <Typography variant="h6" className="faq-section-title">
                      Products & Services
                    </Typography>
                    <Typography variant="body2" className="faq-section-desc">
                      Information about our furniture materials, customization options, and care instructions
                    </Typography>
                    
                    {faq.slice(8, 12).map((item, index) => (
                      <Accordion key={index + 8} className="faq-accordion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          className="faq-question"
                        >
                          <Typography variant="h6" className="question-text">
                            {item.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                          <Typography variant="body1" className="answer-text">
                            {item.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}

                    {/* Shipping & Delivery Section */}
                    <Typography variant="h6" className="faq-section-title">
                      Shipping & Delivery
                    </Typography>
                    <Typography variant="body2" className="faq-section-desc">
                      Track your orders, understand delivery times, and learn about our shipping policies
                    </Typography>
                    
                    {faq.slice(12).map((item, index) => (
                      <Accordion key={index + 12} className="faq-accordion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          className="faq-question"
                        >
                          <Typography variant="h6" className="question-text">
                            {item.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails className="faq-answer">
                          <Typography variant="body1" className="answer-text">
                            {item.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </TabPanel>

            {/* Contact Panel */}
            <TabPanel value="3" className="tab-panel">
              <Grid container spacing={3}>
                {/* Contact Info */}
                <Grid item xs={12} md={5}>
                  <Card className="contact-info-card">
                    <CardContent>
                      <Box className="section-header">
                        <ContactSupportIcon className="section-icon" />
                        <Typography variant="h4" className="section-title">
                          Get In Touch
                        </Typography>
                        <Typography variant="body1" className="section-subtitle">
                          We're here to help you with any questions
                        </Typography>
                      </Box>

                      <Stack spacing={3} className="contact-details">
                        <Box className="contact-item">
                          <EmailIcon className="contact-icon" />
                          <Box>
                            <Typography variant="h6">Email</Typography>
                            <Typography variant="body2" color="text.secondary">
                              support@furniture.com
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="contact-item">
                          <PhoneIcon className="contact-icon" />
                          <Box>
                            <Typography variant="h6">Phone</Typography>
                            <Typography variant="body2" color="text.secondary">
                              +1 (555) 123-4567
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="contact-item">
                          <LocationOnIcon className="contact-icon" />
                          <Box>
                            <Typography variant="h6">Address</Typography>
                            <Typography variant="body2" color="text.secondary">
                              123 Furniture Street<br />
                              Design District, NY 10001
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="contact-item">
                          <AccessTimeIcon className="contact-icon" />
                          <Box>
                            <Typography variant="h6">Business Hours</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Mon - Fri: 9:00 AM - 6:00 PM<br />
                              Sat - Sun: 10:00 AM - 4:00 PM
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Contact Form */}
                <Grid item xs={12} md={7}>
                  <Card className="contact-form-card">
                    <CardContent>
                      <Typography variant="h5" className="form-title">
                        Send us a Message
                      </Typography>
                      <Typography variant="body1" className="form-subtitle">
                        Fill out the form below and we'll get back to you as soon as possible
                      </Typography>

                      <form className="contact-form">
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box className="form-group">
                              <Typography variant="subtitle2" className="form-label">
                                Your Name *
                              </Typography>
                              <input
                                type="text"
                                name="memberNick"
                                placeholder="Enter your full name"
                                className="form-input"
                                required
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box className="form-group">
                              <Typography variant="subtitle2" className="form-label">
                                Email Address *
                              </Typography>
                              <input
                                type="email"
                                name="memberEmail"
                                placeholder="Enter your email"
                                className="form-input"
                                required
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <Box className="form-group">
                              <Typography variant="subtitle2" className="form-label">
                                Subject
                              </Typography>
                              <input
                                type="text"
                                name="subject"
                                placeholder="What is this about?"
                                className="form-input"
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <Box className="form-group">
                              <Typography variant="subtitle2" className="form-label">
                                Message *
                              </Typography>
                              <textarea
                                name="memberMsg"
                                rows={6}
                                placeholder="Tell us how we can help you..."
                                className="form-textarea"
                                required
                              />
                            </Box>
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              endIcon={<SendIcon />}
                              className="submit-button"
                              fullWidth
                            >
                              Send Message
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </TabContext>
      </Container>
    </div>
  );
}
