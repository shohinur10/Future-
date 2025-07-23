import React, { useState } from "react";
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  Stack,
  TextField,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  Divider
} from "@mui/material";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { T } from "../../lib/types/common";
import { Messages } from "../../lib/config";
import { LoginInput, MemberInput } from "../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { useGlobals } from "../hooks/useGlobals";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled(Box)`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  padding: 0;
  outline: none;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
`;

const BrandSection = styled(Box)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("/img/furniture.webp") center/cover;
    opacity: 0.1;
    z-index: 0;
  }
`;

const FormSection = styled(Box)`
  padding: 40px;
  width: 100%;
  position: relative;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
    setError("");
  };
  
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
    setError("");
  };
  
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
    setError("");
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (signupOpen) {
        handleSignupRequest();
      } else {
        handleLoginRequest();
      }
    }
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.length >= 10;
  };

  const resetForm = () => {
    setMemberNick("");
    setMemberPhone("");
    setMemberPassword("");
    setError("");
    setLoading(false);
  };

  const handleSignupRequest = async () => {
    try {
      setLoading(true);
      setError("");

      // Validation
      if (!memberNick.trim()) {
        throw new Error("Username is required");
      }
      if (!memberPhone.trim() || !validatePhone(memberPhone)) {
        throw new Error("Please enter a valid phone number");
      }
      if (!memberPassword || memberPassword.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const signupInput: MemberInput = {
        memberNick: memberNick.trim(),
        memberPhone: memberPhone.trim(),
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);
      setAuthMember(result);
      resetForm();
      handleSignupClose();
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  const handleLoginRequest = async () => {
    try {
      setLoading(true);
      setError("");

      const loginValue = memberNick;
      
      if (!loginValue.trim() || !memberPassword) {
        throw new Error("Please fill in all fields");
      }

      const loginInput: LoginInput = { memberNick: memberNick.trim(), memberPassword };

      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      resetForm();
      handleLoginClose();
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    if (signupOpen) handleSignupClose();
    if (loginOpen) handleLoginClose();
  };

  return (
    <>
      {/* Signup Modal */}
      <StyledModal
        open={signupOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <ModalContainer sx={{ width: { xs: '95%', sm: '600px', md: '800px' }, display: 'flex' }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 10,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)' }
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <BrandSection sx={{ width: { xs: '100%', md: '350px' }, position: 'relative', zIndex: 1 }}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  Future Furniture
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  Join our community and discover amazing furniture collections for your dream space.
                </Typography>
              </Box>
            </BrandSection>

            <FormSection sx={{ width: { xs: '100%', md: '450px' } }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
                Create Account
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 4 }}>
                Join Future Furniture today
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Stack spacing={3}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={memberNick}
                  onChange={handleUsername}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={memberPassword}
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={memberPhone}
                  onChange={handlePhone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleSignupRequest}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    borderRadius: '12px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)',
                    }
                  }}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
            </Stack>
            </FormSection>
          </ModalContainer>
        </Fade>
      </StyledModal>

      {/* Login Modal */}
      <StyledModal
        open={loginOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>
          <ModalContainer sx={{ width: { xs: '95%', sm: '500px', md: '700px' }, display: 'flex' }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                zIndex: 10,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.4)' }
              }}
            >
              <CloseIcon />
            </IconButton>

            <BrandSection sx={{ width: { xs: '100%', md: '300px' }, position: 'relative', zIndex: 1 }}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  Sign in to your Future Furniture account
                </Typography>
              </Box>
            </BrandSection>

            <FormSection sx={{ width: { xs: '100%', md: '400px' } }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#2c3e50' }}>
                Sign In
              </Typography>
              <Typography variant="body2" sx={{ color: '#7f8c8d', mb: 3 }}>
                Welcome back to Future Furniture
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Stack spacing={3}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  value={memberNick}
                  onChange={handleUsername}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={memberPassword}
                  onChange={handlePassword}
                  onKeyDown={handlePasswordKeyDown}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleLoginRequest}
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    borderRadius: '12px',
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)',
                    }
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
            </Stack>
            </FormSection>
          </ModalContainer>
        </Fade>
      </StyledModal>
    </>
  );
}
