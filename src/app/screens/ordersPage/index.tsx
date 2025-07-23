/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, SyntheticEvent, useEffect } from "react";
import { 
  Container, 
  Stack, 
  Box, 
  Card,
  CardContent,
  Typography,
  Paper,
  Avatar,
  Chip,
  Button
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ProcessingIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../lib/types/order";
import { OrderStatus } from "../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../components/hooks/useGlobals";
import { useNavigate } from "react-router-dom";
import "../../../css/order.css";
import { serverApi } from "../../lib/config";
import { MemberType } from "../../lib/enums/member.enum";
import { JSX } from "react/jsx-runtime";
import PausedOrders from "./PauseOrder";
import ProcessOrders from "./ProcessOrder";
import FinishedOrders from "./FinishedOrder";
import { retrievePausedOrders, retrieveProcessOrders, retrieveFinishedOrders } from "./selector";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch( setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { orderBuilder, authMember } = useGlobals();
  const finishedOrders = useSelector(retrieveFinishedOrders);
  const processOrders = useSelector(retrieveProcessOrders);
  const pausedOrders = useSelector(retrievePausedOrders);
  const { setFinishedOrders, setProcessOrders, setPausedOrders } =
    actionDispatch(useDispatch());
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page:1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS **/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Helper function for user image
  const getUserImageUrl = (imageData: string | undefined): string => {
    if (!imageData) return "/icons/default-user.svg";
    if (imageData.startsWith('data:')) return imageData;
    return `${serverApi}/${imageData}`;
  };

  if (!authMember) navigate("/");
  
  return (
    <div className="order-page">
      {/* Hero Section */}
      <Box className="order-hero">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
              <ShoppingBagIcon 
                style={{ color: '#667eea', fontSize: '3rem' }}
              />
              <Typography 
                variant="h2" 
                className="hero-title"
                style={{ color: '#1e293b', margin: 0 }}
              >
                My Orders
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              className="hero-subtitle"
              style={{ color: '#64748b' }}
            >
              Track and manage all your furniture orders
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" className="order-container">
        <Box className="order-content">
          {/* Main Orders Section */}
          <Box className="order-main">
            <TabContext value={value}>
              {/* Tab Navigation */}
              <Paper className="order-tab-navigation" elevation={0}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  centered
                  className="order-tabs"
                >
                  <Tab 
                    icon={<PauseCircleIcon />} 
                    label="Paused Orders" 
                    value="1" 
                    className="order-tab-item"
                  />
                  <Tab 
                    icon={<ProcessingIcon />} 
                    label="Processing" 
                    value="2" 
                    className="order-tab-item"
                  />
                  <Tab 
                    icon={<CheckCircleIcon />} 
                    label="Completed" 
                    value="3" 
                    className="order-tab-item"
                  />
                </Tabs>
              </Paper>

              {/* Tab Content */}
              <Box className="order-tab-content">
                <PausedOrders setValue={setValue} />
                <ProcessOrders setValue={setValue} />
                <FinishedOrders />
              </Box>
            </TabContext>
          </Box>

          {/* Sidebar */}
          <Box className="order-sidebar">
            {/* User Profile Card */}
            <Card className="profile-card">
              <CardContent>
                <Box className="profile-header">
                  <PersonIcon className="profile-icon" />
                  <Typography variant="h6" className="profile-title">
                    Customer Profile
                  </Typography>
                </Box>
                
                <Box className="profile-content">
                  <Box className="profile-avatar-section">
                    <Avatar
                      src={getUserImageUrl(authMember?.memberImage)}
                      className="profile-avatar"
                    />
                    <Chip
                      icon={authMember?.memberType === MemberType.USER ? 
                        <PersonIcon /> : <PersonIcon />}
                      label={authMember?.memberType === MemberType.USER ? 
                        "Customer" : "Business"}
                      className="profile-chip"
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="h6" className="profile-name">
                    {authMember?.memberNick}
                  </Typography>
                  
                  <Box className="profile-address">
                    <LocationOnIcon 
                      className="address-icon" 
                      style={{ color: 'white' }}
                    />
                    <Typography variant="body2" className="address-text">
                      {authMember?.memberAddress || "No address provided"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Payment Card */}
            <Card className="payment-card">
              <CardContent>
                <Box className="payment-header">
                  <CreditCardIcon className="payment-icon" />
                  <Typography variant="h6" className="payment-title">
                    Payment Method
                  </Typography>
                </Box>
                
                <Box className="payment-form">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    className="payment-input"
                  />
                  
                  <Box className="payment-row">
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      className="payment-input-half"
                    />
                    <input
                      type="text"
                      name="cardCVV"
                      placeholder="CVV"
                      className="payment-input-half"
                    />
                  </Box>
                  
                  <input
                    type="text"
                    name="cardHolder"
                    placeholder="Cardholder Name"
                    className="payment-input"
                  />
                  
                  <Box className="payment-methods">
                    <img src="/icons/visa-card.svg" alt="Visa" className="payment-method-icon" />
                    <img src="/icons/master-card.svg" alt="Mastercard" className="payment-method-icon" />
                    <img src="/icons/paypal-card.svg" alt="PayPal" className="payment-method-icon" />
                    <img src="/icons/western-card.svg" alt="Western Union" className="payment-method-icon" />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
