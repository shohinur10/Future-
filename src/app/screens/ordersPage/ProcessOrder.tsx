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
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Messages, serverApi } from "../../lib/config";
import { Product } from "../../lib/types/product";
import { Order, OrderItem, OrderUpdateInput } from "../../lib/types/order";
import { useGlobals } from "../../components/hooks/useGlobals";
import { OrderStatus } from "../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { T } from "../../lib/types/common";
import OrderService from "../../services/OrderService";

/** REDUX SLICE & SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  /** HANDLERS **/
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  // Helper function for product image URL
  const getProductImageUrl = (imageData: string | undefined): string => {
    if (!imageData) return "/icons/noimage-list.svg";
    if (imageData.startsWith('data:')) return imageData;
    if (imageData.startsWith('/')) return imageData;
    return `${serverApi}/${imageData}`;
  };

  return (
    <TabPanel value={"2"}>
      <Stack spacing={3}>
        {processOrders?.map((order: Order) => {
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
                      icon={<HourglassEmptyIcon />}
                      label="Processing" 
                      className="status-chip processing-chip"
                      size="small"
                    />
                  </Box>
                  <Box className="order-date-section">
                    <Typography variant="body2" className="order-date">
                      <AccessTimeIcon style={{ fontSize: '1rem', marginRight: '4px' }} />
                      Processing since {moment(order.createdAt).format("MMM DD, YYYY")}
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

                {/* Action Buttons */}
                <Box className="order-actions">
                  <Box className="processing-info">
                    <Typography variant="body2" className="processing-note">
                      <HourglassEmptyIcon style={{ fontSize: '1rem', marginRight: '6px' }} />
                      Order is being prepared for delivery
                    </Typography>
                  </Box>
                  <Button
                    value={order._id}
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    className="verify-btn"
                    onClick={finishOrderHandler}
                  >
                    Mark as Received
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}

        {!processOrders || processOrders.length === 0 && (
          <Box className="empty-state">
            <img
              src="/icons/noimage-list.svg"
              alt="No processing orders"
              className="empty-state-image"
            />
            <Typography variant="h6" className="empty-state-title">
              No Processing Orders
            </Typography>
            <Typography variant="body2" className="empty-state-subtitle">
              You don't have any orders being processed at the moment
            </Typography>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
