import React, { useState } from "react";
import { Box, Stack, MenuItem, Container, Button, Menu, ListItemIcon } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Basket from "./Basket";
import { useGlobals } from "../hooks/useGlobals";
import { CartItem } from "../../lib/types/search";
import { serverApi } from "../../lib/config";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { Logout } from "@mui/icons-material";

const HomeNavbar = (props: any) => {
	const navigate = useNavigate();
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, setLoginOpen, setSignupOpen } = props;
	const { authMember } = useGlobals();
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);

	/** HANDLERS **/
	const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseLogout = () => {
		setAnchorEl(null);
	};

	const handleLogoutRequest = async () => {
		try {
			const member = new MemberService();
			await member.logout();
			// Remove the result.data.state check since logout returns void
			navigate('/');
		} catch (err) {
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Stack className="home-navbar">
			<Container className="navbar-container">
				<div className="menu">
					<div className="links">
						<div>
							<NavLink to="/">
								<img
									className="brand-logo"
									src="/icons/furniture-logo-design-vector-26988909.jpg"
									alt="Future Furniture"
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.src = "/icons/favicon.svg";
									}}
								/>
							</NavLink>
						</div>
						<div className="hover-line">
							<NavLink 
								to="/" 
								className={({ isActive }) => isActive ? "underline" : ""}
							>
								Home
							</NavLink>
						</div>
						<div className="hover-line">
							<NavLink 
								to="/products" 
								className={({ isActive }) => isActive ? "underline" : ""}
							>
								Products
							</NavLink>
						</div>
						{authMember && (
							<div className="hover-line">
								<NavLink 
									to="/orders" 
									className={({ isActive }) => isActive ? "underline" : ""}
								>
									Orders
								</NavLink>
							</div>
						)}
						{authMember && (
							<div className="hover-line">
								<NavLink 
									to="/member-page" 
									className={({ isActive }) => isActive ? "underline" : ""}
								>
									My Page
								</NavLink>
							</div>
						)}
						<div className="hover-line">
							<NavLink 
								to="/help" 
								className={({ isActive }) => isActive ? "underline" : ""}
							>
								Help
							</NavLink>
						</div>
					</div>

					{/* Right side buttons and user info */}
					<div className="auth-section">
						{!authMember ? (
							<div className="auth-buttons">
								<Button
									variant="text"
									className="login-button"
									onClick={() => setLoginOpen(true)}
								>
									Login
								</Button>
								<Button
									variant="outlined"
									className="signup-button"
									onClick={() => setSignupOpen(true)}
								>
									Sign Up
								</Button>
							</div>
						) : (
							<div className="user-section">
								<Basket
									cartItems={cartItems}
									onAdd={onAdd}
									onRemove={onRemove}
									onDelete={onDelete}
									onDeleteAll={onDeleteAll}
								/>
								
								<Button onClick={handleLogoutClick}>
									<img
										className="user-avatar"
										src={
											authMember?.memberImage
												? `${serverApi}/${authMember.memberImage}`
												: "/icons/default-user.svg"
										}
										alt="User avatar"
										onError={(e) => {
											const target = e.target as HTMLImageElement;
											target.src = "/icons/default-user.svg";
										}}
									/>
								</Button>

								<Menu
									open={open}
									anchorEl={anchorEl}
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
											<Logout fontSize="small" />
										</ListItemIcon>
										Logout
									</MenuItem>
								</Menu>
							</div>
						)}
					</div>
				</div>
			</Container>
		</Stack>
	);
};

export default HomeNavbar;
