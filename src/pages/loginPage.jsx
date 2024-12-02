import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router";
import { COLOR } from "../assets/Color";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {

  const [isShowPass, setIsShowPass] = useState(false);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: COLOR.primary_white,
          width: 400,
          height: 550,
          borderRadius: 4,
        }}
      >
        <Box
          backgroundColor={COLOR.primary_blue}
          height="10%"
          width="100%"
          sx={{
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            alt="inlaco-logo"
            width="54"
            height="54"
            src={require("../assets/images/inlaco-logo.png")}
            style={{ cursor: "pointer" }}
          />
        </Box>
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
        <Box
          sx={{
            flex: 1,
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: 5,
            paddingRight: 5,
            width: "100%",
            paddingTop: 8,
          }}
        >
          <Typography mb={2} sx={{ fontSize: 28, fontWeight: 700, }}>
            Đăng nhập
          </Typography>
          {/* {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )} */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Tên đăng nhập"
            id="username"
            autoFocus
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              },
            }}
            // autoComplete="username"
            // name="username"
            // value={phoneNumber}
            // onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{
              backgroundColor: COLOR.secondary_white,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            type={isShowPass ? "text" : "password"}
            id="password"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      isShowPass ? setIsShowPass(false) : setIsShowPass(true);
                    }}
                  >
                    <VisibilityOffIcon />
                  </IconButton>
                ),
              },
            }}
            // name="password"
            // autoComplete="current-password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: COLOR.secondary_white,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, pt: 1, pb: 1 }}
            // disabled={loading}
          >
            {/* {loading ? <CircularProgress size={24} /> : "Login"} */}
            Đăng nhập
          </Button>
        </Box>
        <Box
          backgroundColor={COLOR.primary_gray}
          height="16%"
          width="100%"
          sx={{
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color={COLOR.primary_white} sx={{ fontSize: 12, fontWeight: 700, textAlign: "center", marginBottom: "2px", }}>
            CÔNG TY CỔ PHẦN HỢP TÁC LAO ĐỘNG VỚI NƯỚC NGOÀI
          </Typography>
          <Typography color={COLOR.primary_white} sx={{ fontSize: 8, textAlign: "center" }}>
            INTERNATIONAL LABOUR AND SERVICES STOCK COMPANY (INLACO - HP)
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
