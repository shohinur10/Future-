import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../lib/types/search";
import { useGlobals } from "../hooks/useGlobals";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../lib/config";


interface OtherNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;
  }
  
  export default function OtherNavbar(props: OtherNavbarProps) {
    const {
      cartItems,
      onAdd,
      onRemove,
      onDelete,
      onDeleteAll,
      setLoginOpen,
      handleLogoutClick,
      anchorEl,
      handleCloseLogout,
      handleLogoutRequest,
    } = props;
    const { authMember } = useGlobals();
  
    return (
      <div className="other-navbar">
        <Container className="navbar-container">
          <Stack className="menu">
            {/* Brand Text instead of Logo */}
            <Box>
              <NavLink to="/" style={{ textDecoration: 'none' }}>
                <Typography variant="h5" sx={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(45deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    textShadow: '0 4px 8px rgba(0,0,0,0.4)'
                  }
                }}>
                  Future Furniture
                </Typography>
              </NavLink>
            </Box>
            <Stack className="links">
              <Box className={"hover-line"}>
                <NavLink to="/">Home</NavLink>
              </Box>
              <Box className={"hover-line"}>
                <NavLink to="/products" className={({ isActive }) => isActive ? "underline" : ""}>
                  Products
                </NavLink>
              </Box>
              {authMember ? (
                <Box className={"hover-line"}>
                  <NavLink to="/orders" className={({ isActive }) => isActive ? "underline" : ""}>
                    Orders
                  </NavLink>
                </Box>
              ) : null}
              {authMember ? (
                <Box className={"hover-line"}>
                  <NavLink to="/member-page" className={({ isActive }) => isActive ? "underline" : ""}>
                    My Page
                  </NavLink>
                </Box>
              ) : null}
              <Box className={"hover-line"}>
                <NavLink to="/help" className={({ isActive }) => isActive ? "underline" : ""}>
                  Help
                </NavLink>
              </Box>
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
  
              {!authMember ? (
                <Box>
                  <Button
                    variant="contained"
                    className="login-button"
                    onClick={() => setLoginOpen(true)}
                  >
                    Login
                  </Button>
                </Box>
              ) : (
                <img
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                      ? (authMember.memberImage.startsWith('/') ? authMember.memberImage : `${serverApi}/${authMember.memberImage}`)
                      : "/icons/default-user.svg"
                  }
                  alt={authMember?.memberNick || "User avatar"}
                  onClick={handleLogoutClick}
                />
              )}
  
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
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
                <MenuItem onClick={handleLogoutRequest}>
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "blue" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Container>
      </div>
    );
  }