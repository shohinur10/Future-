import React from "react";
import {
  Box,
  Stack,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Divider,
  Grid
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../lib/config";
import { Order, OrderItem } from "../../lib/types/order";
import { Product } from "../../lib/types/product";

/** REDUX SLICE & SELECTOR */
const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  // Helper function for product image URL
  const getProductImageUrl = (imageData: string | undefined): string => {
    if (!imageData) return "/icons/noimage-list.svg";
    if (imageData.startsWith('data:')) return imageData;
    return `${serverApi}/${imageData}`;
  };

  return (
    <TabPanel value={"3"}>
      <Stack spacing={3}>
        {finishedOrders?.map((order: Order) => {
          return (
            <Card key={order._id} className="modern-order-card">
              <CardContent className="order-card-content">
                {/* Order Header */}
                <Box className="order-header">
                  <Box className="order-info">
                    <Typography variant="h6" className="order-title">
                      <ShoppingCartIcon className="order-icon" />
                      Order #{order._id.slice(-6).toUpperCase()}
                    </Typography>
                    <Chip 
                      icon={<CheckCircleIcon />}
                      label="Completed" 
                      className="status-chip completed-chip"
                      size="small"
                    />
                  </Box>
                  <Box className="order-date-section">
                    <Typography variant="body2" className="order-date">
                      <EventAvailableIcon style={{ fontSize: '1rem', marginRight: '4px' }} />
                      Delivered on {new Date(order.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Divider className="order-divider" />

                {/* Products List */}
                <Box className="products-section">
                  <Typography variant="subtitle1" className="section-title">
                    Order Items
                  </Typography>
                  <Stack spacing={2}>
                    {order?.orderItems?.map((item: OrderItem) => {
                      const product: Product = order.productData.filter(
                        (ele: Product) => item.productId === ele._id
                      )[0];
                      
                      return (
                        <Card key={item._id} className="product-item-card">
                          <CardContent className="product-item-content">
                            <Box className="product-item">
                              <Avatar
                                src={getProductImageUrl(product.productImages[0])}
                                className="product-avatar"
                                variant="rounded"
                              />
                              <Box className="product-details">
                                <Typography variant="h6" className="product-name">
                                  {product.productName}
                                </Typography>
                                <Typography variant="body2" className="product-category">
                                  {product.productCategory}
                                </Typography>
                              </Box>
                              <Box className="product-quantity">
                                <Typography variant="body2" className="quantity-label">
                                  Qty:
                                </Typography>
                                <Chip 
                                  label={item.itemQuantity}
                                  size="small"
                                  className="quantity-chip"
                                />
                              </Box>
                              <Box className="product-pricing">
                                <Typography variant="body2" className="unit-price">
                                  ${item.itemPrice} each
                                </Typography>
                                <Typography variant="h6" className="total-price">
                                  ${(item.itemQuantity * item.itemPrice).toFixed(2)}
                                </Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Stack>
                </Box>

                <Divider className="order-divider" />

                {/* Order Summary */}
                <Box className="order-summary">
                  <Typography variant="subtitle1" className="section-title">
                    Order Summary
                  </Typography>
                  <Grid container spacing={2} className="summary-grid">
                    <Grid item xs={6}>
                      <Box className="summary-item">
                        <AttachMoneyIcon className="summary-icon" />
                        <Box>
                          <Typography variant="body2" className="summary-label">
                            Subtotal
                          </Typography>
                          <Typography variant="h6" className="summary-value">
                            ${(order.orderTotal - order.orderDelivery).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className="summary-item">
                        <LocalShippingIcon className="summary-icon" />
                        <Box>
                          <Typography variant="body2" className="summary-label">
                            Delivery
                          </Typography>
                          <Typography variant="h6" className="summary-value">
                            ${order.orderDelivery.toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box className="total-section">
                    <Typography variant="h5" className="total-amount">
                      Total: ${order.orderTotal.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>

                {/* Completion Status */}
                <Box className="order-actions">
                  <Box className="completion-info">
                    <Typography variant="body2" className="completion-note">
                      <CheckCircleIcon style={{ fontSize: '1rem', marginRight: '6px' }} />
                      Order completed successfully - Thank you for your purchase!
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}

        {!finishedOrders || finishedOrders.length === 0 && (
          <Box className="empty-state">
            <img
              src="/icons/noimage-list.svg"
              alt="No completed orders"
              className="empty-state-image"
            />
            <Typography variant="h6" className="empty-state-title">
              No Completed Orders
            </Typography>
            <Typography variant="body2" className="empty-state-subtitle">
              You don't have any completed orders yet
            </Typography>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}

