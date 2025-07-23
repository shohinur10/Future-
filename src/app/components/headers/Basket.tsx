import React from "react";
import { Box, Button, Stack, Typography, Fade } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../lib/types/search";
import { Messages, serverApi } from "../../lib/config";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../hooks/useGlobals";
import { sweetErrorHandling } from "../../lib/sweetAlert";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );
  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      setIsLoading(true);
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      navigate("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
            transform: 'scale(1.05)',
          }
        }}
      >
        <Badge 
          badgeContent={cartItems.length} 
          color="secondary"
          sx={{
            '& .MuiBadge-badge': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.75rem',
              boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
            }
          }}
        >
          <ShoppingCartIcon sx={{ color: '#667eea', fontSize: '1.5rem' }} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 8px 32px rgba(0,0,0,0.15))",
            mt: 1.5,
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'center' }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: '1.2rem' }} />
                <span>Your cart is empty</span>
              </Box>
            ) : (
              <Stack flexDirection={"row"} sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShoppingCartIcon sx={{ fontSize: '1.2rem' }} />
                  <span>Cart Items ({cartItems.length})</span>
                </Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '50%',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                      transform: 'scale(1.1)',
                    }
                  }}
                  onClick={() => onDeleteAll()}
                  title="Clear all items"
                >
                  <DeleteForeverIcon sx={{ fontSize: '1.2rem' }} />
                </Box>
              </Stack>
            )}
          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cartItems.length === 0 ? (
                <Fade in={true}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '200px',
                    gap: 2,
                    color: '#64748b'
                  }}>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: '3rem', opacity: 0.3 }} />
                    <Typography variant="body1" sx={{ fontWeight: 500, textAlign: 'center' }}>
                      No items in your cart yet
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7, textAlign: 'center' }}>
                      Add some furniture to get started!
                    </Typography>
                  </Box>
                </Fade>
              ) : (
                cartItems.map((item: CartItem) => (
                  <Fade in={true} key={item._id}>
                    <Box className={"basket-info-box"}>
                    <div className={"cancel-btn"}>
                      <CancelIcon
                        onClick={() => onDelete(item)}
                      />
                    </div>
                      <img src={serverApi + "/" + item.image} alt={item.name} />
                    <span className={"product-name"}>{item.name}</span>
                    <p className={"product-price"}>
                        ${item.price} × {item.quantity}
                    </p>
                      <Box className="col-2">
                        <button
                          onClick={() => onRemove(item)}
                          className="remove"
                          title="Remove one"
                        >
                          −
                        </button>
                        <button 
                          onClick={() => onAdd(item)} 
                          className="add"
                          title="Add one"
                        >
                          +
                        </button>
                      </Box>
                    </Box>
                  </Fade>
                ))
              )}
            </Box>
          </Box>
          
          {cartItems.length !== 0 && (
            <Fade in={true}>
            <Box className={"basket-order"}>
                <Box className={"price"}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <span>Subtotal:</span>
                      <span>${itemsPrice.toFixed(2)}</span>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocalShippingIcon sx={{ fontSize: '1rem' }} />
                        <span>Shipping:</span>
                      </Box>
                      <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
                    </Box>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      width: '100%',
                      pt: 1,
                      borderTop: '2px solid rgba(102, 126, 234, 0.2)',
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}>
                      <span>Total:</span>
                      <span>${totalPrice}</span>
                    </Box>
                  </Box>
                </Box>
              <Button
                onClick={proceedOrderHandler}
                  startIcon={isLoading ? null : <ShoppingCartIcon />}
                variant={"contained"}
                  disabled={isLoading}
                  sx={{ position: 'relative' }}
              >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
            </Box>
            </Fade>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
