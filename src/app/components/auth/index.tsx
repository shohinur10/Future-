import React, { useState } from "react";
import {
  Backdrop,
  Fab,
  Fade,
  Modal,
  Stack,
  TextField,
  Box
} from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../lib/types/common";
import { Messages } from "../../lib/config";
import { LoginInput, MemberInput } from "../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../lib/sweetAlert";
import { useGlobals } from "../hooks/useGlobals";

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
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
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter") {
      loginOpen ? handleLoginRequest() : handleSignupRequest();
    }
  };

  const handleSignupRequest = async () => {
    try {
      if (!memberNick || !memberPhone || !memberPassword)
        throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick,
        memberPhone,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (!memberNick || !memberPassword) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  const PaperStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
    padding: "20px",
    display: "flex",
    flexDirection: "row",
  };

  return (
    <div>
      {/* Signup Modal */}
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <Box sx={PaperStyle} width="800px">
            <ModalImg src="/img/auth.webp" alt="camera" />
            <Stack sx={{ marginLeft: "40px", width: "100%", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField label="username" variant="outlined" sx={{ mt: 1 }} onChange={handleUsername} />
              <TextField label="phone number" variant="outlined" sx={{ my: 2 }} onChange={handlePhone} />
              <TextField label="password" variant="outlined" type="password" onChange={handlePassword} onKeyDown={handlePasswordKeyDown} />
              <Fab variant="extended" color="primary" sx={{ mt: 3, width: 120 }} onClick={handleSignupRequest}>
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>
          <Box sx={PaperStyle} width="700px">
            <ModalImg src="/img/auth.webp" alt="camera" />
            <Stack sx={{ marginLeft: "40px", width: "100%", alignItems: "center" }}>
              <h2>Login Form</h2>
              <TextField label="username" variant="outlined" sx={{ mt: 2, mb: 2 }} onChange={handleUsername} />
              <TextField label="password" variant="outlined" type="password" onChange={handlePassword} onKeyDown={handlePasswordKeyDown} />
              <Fab variant="extended" color="primary" sx={{ mt: 3, width: 120 }} onClick={handleLoginRequest}>
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
